import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Food = () => {
    const [food, setFood] = useState([])
    const [editFood, setEditFood] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const { trySuccessAlart, user } = useAuth()
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.id = editFood._id
        fetch(`https://floating-oasis-20837.herokuapp.com/addFoodEdit/${editFood?._id}`, {
            method: "PUT",
            "headers": {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    reset()
                    fetch(`https://floating-oasis-20837.herokuapp.com/food`).then(res => res.json()).then(data => setFood(data))
                    myAlartForDataAdd()
                }
            })
    };
    useEffect(() => {
        fetch(`https://floating-oasis-20837.herokuapp.com/food`).then(res => res.json()).then(data => setFood(data))
    }, [food])
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

                fetch(`https://floating-oasis-20837.herokuapp.com/food/${id}`).then(res => res.json()).then(data => setEditFood(data))
                    .then(ress => ress.json())
                    .then(res => {

                        fetch(`https://floating-oasis-20837.herokuapp.com/food`)
                            .then(res => res.json())
                            .then(data => {
                                setFood(data)
                                setShow(true);
                            })
                    })
            }
        })
    }
    const handleCancel = (id) => {
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
                fetch(`https://floating-oasis-20837.herokuapp.com/addFood/${id}`, {
                    method: "DELETE"
                })
                    .then(ress => ress.json())
                    .then(res => {

                        const re = food.filter(item => item._id !== id)
                        setFood(re);
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
    const number = Math.ceil(food.length / userPerPage)
    const displayFood = food?.slice(pagesVisited, pagesVisited + userPerPage).map((item, i) => <>
        <tr>
            <td>{i + 1}</td>


            <td>{item?.foodName}</td>
            <td>{item?.price}</td>

            <td><button className="btn w-100 btn-outline-success" onClick={() => handleUpdate(item?._id)}>Update Now</button></td>

            <td><button className="btn w-100 btn-danger" onClick={() => handleCancel(item?._id)}>Cancel</button></td>
        </tr>
    </>)

    const handlePageChange = (event) => {
        console.log(event);
        // TODO Only change displayed selected page
        // when its content is loaded in useEffect.
        setPageCount(event.selected);
    };

    return (
        <><Table className='text-center' responsive="xl" striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Food Name</th>
                    <th>Food Price </th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    displayFood
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
                        <h1 className="title">Edit Food Item  </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="contact-form row">
                            <div className="form-field col-lg-6">
                                <input defaultValue={editFood?.foodName} className="input-text js-input" type="text" {...register("foodName", { required: true })} />
                                <label className="label" for="name">Food Name</label>
                            </div>
                            <div className="form-field col-lg-6 ">
                                <input defaultValue={editFood?.price} className="input-text js-input" type="number" {...register("price", { required: true })} />
                                <label className="label" for="email">Food Price</label>
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

export default Food;