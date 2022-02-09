import React from 'react';
import { FaSnapchatGhost, FaInstagram,FaTwitter, FaFacebookF } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-dark">
        <footer>
            <Container>
                <Row>
                    <Col md={3} sm={6} className="item">
                        <h3>Services</h3>
                        <ul>
                            <li>Boarding</li>
                            <li>Meal</li>
                            <li>Online Order</li>
                        </ul>
                    </Col>
                        <Col sm={6} md={3} className="item">
                        <h3>About</h3>
                        <ul>
                            <li>Company</li>
                            <li>Team</li>
                            <li>Careers</li>
                        </ul>
                    </Col>
                    <Col md={6} className="col-md-6 item text">
                        <h3>Yooda Hostel</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </Col>
                        <Col className="item social">
                            <span>< FaFacebookF className='icon' /></span>
                            <span>< FaTwitter className='icon' /></span>
                            <span>< FaInstagram className='icon' /></span>
                            <span>< FaSnapchatGhost className='icon' /></span>                   
                        </Col>
                </Row>
                <p className="copyright">CopyRight© by Developer Farid 2022</p>
            </Container>
        </footer>
    </div>
    );
};

export default Footer;