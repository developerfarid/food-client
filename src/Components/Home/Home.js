import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Header from '../Share/Header/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <Container className='text-center py-5'>
            <h1>Admin Email: pustfarid333@gmail.com </h1>
            <h1>Admin Password: pustfarid333@gmail.com </h1>
            </Container>
            <Footer />
        </div>
    );
};

export default Home;