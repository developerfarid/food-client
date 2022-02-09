import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useAuth from '../../Hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, logOut, admin } = useAuth()
  return (
    <div className="header  w-100 h-100">

      <Navbar bg="dark" expand="lg">
        <Container >
          <Link className='navbar-brand logo' to="/home">Yooda Hostel</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto menu align-items-center d-flex">
              <Link className='li nav-link ' to="/home">Home</Link>
              {(user.email) && <Link className='li nav-link ' to="/deshboard">Deshboard</Link>}
              {user?.email ? <button className='li nav-link ' style={{ background: "none", border: "none" }} onClick={logOut}>Logout</button> : <Link className='li nav-link ' style={{ background: "none", border: "none" }} to="/login">Login</Link>}
              {user.email && <Navbar.Text className="fw-bold fs-5 text-info">
                <span>{user?.displayName}</span>
              </Navbar.Text>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;