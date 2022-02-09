import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Offcanvas, Row } from 'react-bootstrap';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { FiMenu, FiUsers } from 'react-icons/fi';
import { GiFoodTruck, GiOpenedFoodCan } from 'react-icons/gi';
import { MdFastfood } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import "./Deshboard.css";

const DeshBoard = () => {
    const { logOut } = useAuth()
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [sea, setSea] = useState("");
    const handleClose = () => setShow(false);
    const { user, admin } = useAuth()
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const search = (e) => {
        setSea(e.target.value)
        setShow(true)
    }
    useEffect(() => {
        fetch(`https://floating-oasis-20837.herokuapp.com/student/${sea}`).then(res => res.json()).then(data => setData(data))
    }, [sea])

    return (
        <>
            <div className="h w-100 bg-black">
                <div className="desboard-heading container ">
                    <Button variant="primary" onClick={handleShow1}>
                        Offcanvas Memu
                    </Button>
                    <input type="text" className='search' placeholder='Search Here By Roll' onBlur={(e) => search(e)} />
                    <span className='d-flex'>
                        <Link style={{ background: "rgb(255, 0, 221)", color: "white" }} className='li nav-link me-3 ' to="/home">Home</Link>
                        <button className='li nav-link ' style={{ background: "none", border: "none" }} onClick={logOut}>Logout</button>
                    </span>
                </div>
            </div>
            <Container className='position-relative'>
                <Row>
                    <Col sm={12} lg={12} md={12} xs={12} className="mx-0 px-0" >
                        <div className="waraper">
                            <Outlet />
                        </div>
                    </Col>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <div className="pricing-box-container">
                                <div className="pricing-box pricing-box-bg-image text-center">
                                    <h5 className='mt-4'>{data?.roll ? "Student Info" : "No Data Found"}</h5>
                                    <ul className="features-list">
                                        <li><strong>Student Name</strong>: {data?.name}</li>
                                        <li><strong>Student Roll</strong>: {data?.roll}</li>
                                        <li><strong>Student Age</strong>: {data?.age}</li>
                                        <li><strong>Student Class</strong>: {data?.className}</li>
                                        <li><strong>Student Hall</strong>: {data?.hall}</li>
                                        <li><strong>Student Action</strong>: {data?.action}</li>
                                        <li><strong>Student Action</strong>: {data?.served ? data?.served : "Not Served"}</li>
                                    </ul>
                                </div>
                            </div>
                        </Modal.Header>
                    </Modal>
                </Row>
            </Container >
            <Offcanvas show={show1} onHide={handleClose1}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <div className="deshboard-menu">
                    <li className='head'>
                        <span>Yooda Hostel</span><span className='toggle'><FiMenu></FiMenu></span>
                    </li>
                    <ul>
                        <li>
                            <Link className='a' to="/deshboard/welcome"><span><FaHome /></span><span>Deshboard</span></Link>
                        </li>
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/student"><span><FiUsers /></span><span>Student List</span></Link>
                        </li>)}
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/addStudent"><span><AiOutlineUsergroupAdd /></span><span>Student Add</span></Link>
                        </li>)}
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/serve"><span><GiFoodTruck /></span><span>Serve Food</span></Link>
                        </li>)}
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/addFood"><span><MdFastfood /></span><span>Add Food</span></Link>
                        </li>)}
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/food"><span><GiOpenedFoodCan /></span><span>Food List</span></Link>
                        </li>)}
                        {(user?.email && admin?.role) && (<li>
                            <Link className='a' to="/deshboard/admin"><span><RiAdminLine /></span><span>Make Admin</span></Link>
                        </li>)}
                    </ul>
                </div>
            </Offcanvas>
        </>
    )
};

export default DeshBoard;