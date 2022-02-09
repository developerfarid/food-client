import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Student = () => {
    const { trySuccessAlart } = useAuth()
    const [student, setStudent] = useState([])
    const [show, setShow] = useState(false);
    const [studentEdit, setStudentEdit] = useState([])
    const handleClose = () => setShow(false);
    const { register, handleSubmit, reset, } = useForm();
    useEffect(() => {
        fetch(`https://floating-oasis-20837.herokuapp.com/student`).then(res => res.json()).then(data => setStudent(data))
    }, [])


    const onSubmit = data => {
        data.id = studentEdit._id
        fetch(`https://floating-oasis-20837.herokuapp.com/addStudent/${studentEdit?._id}`, {
            method: "PUT",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    reset()
                    fetch(`https://floating-oasis-20837.herokuapp.com/student`).then(res => res.json()).then(data => setStudent(data))
                    myAlartForDataAdd()
                }
            })
    };

    const myAlartForDataAdd = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Data has been Update',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleUpdate = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setShow(true)
                console.log(`https://floating-oasis-20837.herokuapp.com/addStudent/${id}`);
                fetch(`https://floating-oasis-20837.herokuapp.com/addStudent/${id}`).then(res => res.json()).then(data => setStudentEdit(data))
                    .then(ress => ress.json())
                    .then(res => {

                        fetch(`https://floating-oasis-20837.herokuapp.com/student`)
                            .then(res => res.json())
                            .then(data => {
                                setStudent(data)
                                setShow(true);
                            })
                    })
            }
        })
    }
    const handleCancel = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`https://floating-oasis-20837.herokuapp.com/addStudent/${id}`);
                fetch(`https://floating-oasis-20837.herokuapp.com/addStudent/${id}`, {
                    method: "DELETE"
                })
                    .then(ress => ress.json())
                    .then(res => {
                        const re = student.filter(item => item._id !== id)
                        setStudent(re);
                    })
                Swal.fire(
                    'Deleted!',
                    'Your Food Item has been deleted.',
                    'success'
                )
            }
        })
    }

    const [pageOffset, setPageOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const handleSetPage = () => {
        const getId = Number(document.getElementById("select").value)
        setPerPage(getId)
    }

    const userPerPage = perPage;
    const pagesVisited = pageCount * userPerPage
    const number = Math.ceil(student.length / userPerPage)
    const displayPost = student.slice(pagesVisited, pagesVisited + userPerPage).map((item, i) => {
        return (
            <>
                <tr>
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>{i + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.roll}</td>
                    <td>{item?.class}</td>
                    <td>{item?.action}</td>
                    <td><button className="btn w-100 btn-outline-success" onClick={() => handleUpdate(item?._id)}>Update Now</button></td>
                    <td><button className="btn w-100 btn-danger" onClick={() => handleCancel(item?._id)}>Cancel</button></td>
                </tr>
            </>
        )
    })

    const handlePageChange = (event) => {
        console.log(event);
        // TODO Only change displayed selected page
        // when its content is loaded in useEffect.
        setPageCount(event.selected);
    };
    const handleSort = () => {
        const getId = (document.getElementById("type").value)
        if (getId === "lowToHigh") {
            var arr = student?.sort((a, b) => {
                return a.roll - b.roll
            }
            )
            setStudent(arr)
        }
    }

    return (
        <>
            <select id='type' className='ms-4 py-2 my-2' onChange={() => handleSort()}>
                <option value="lowToHigh">Sort by Roll</option>
            </select>
            <Table className='text-center' responsive="xl" striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Roll </th>
                        <th>Class</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayPost
                    }
                </tbody>
            </Table>
            <div className="parent  d-flex  ">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakLabel={"..."}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    pageCount={number}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    forcePage={pageOffset}
                />
                <select id='select' className='ms-4 py-2' onChange={() => handleSetPage()}>
                    <option value="5">Per Page 5 Student</option>
                    <option value="10">Per Page 10 Student</option>
                    <option value="15">Per Page 15 Student</option>
                    <option value="20">Per Page 20 Student</option>
                </select>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <section className="get-in-touch">
                        <h1 className="title">Add Student Account Here!  </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="contact-form row">
                            <div className="form-field col-lg-6">
                                <input defaultValue={studentEdit?.name} id="name" className="input-text js-input" type="text" {...register("name", { required: true })} />
                                <label className="label" for="name">Full Name</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input id="email" defaultValue={studentEdit?.roll} className="input-text js-input" type="number" {...register("roll", { required: true })} />
                                <label className="label" for="email">Roll Number</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input id="company" defaultValue={studentEdit?.age} className="input-text js-input" type="text" {...register("age", { required: true })} />
                                <label className="label" for="company">Age</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input id="phone" defaultValue={studentEdit?.class} className="input-text js-input" type="text" {...register("class", { required: true })} />
                                <label className="label" for="phone">Class</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <input id="message" defaultValue={studentEdit?.hall} className="input-text js-input" type="text" {...register("hall", { required: true })} />
                                <label className="label" for="message">Hall Name</label>
                            </div>
                            <div className="form-field col-lg-6">
                                <select defaultValue={studentEdit?.action} className="input-text js-input" {...register("action")}>
                                    <option >Status</option>
                                    <option value="active">Active</option>
                                    <option value="nnactive">Inactive</option>
                                </select>
                            </div>

                            <div className="form-field col-lg-12">
                                <input className="submit-btn" type="submit" value="Submit" />
                            </div>
                        </form>
                    </section>
                </Modal.Header>
            </Modal>
        </>
    );
};

export default Student;