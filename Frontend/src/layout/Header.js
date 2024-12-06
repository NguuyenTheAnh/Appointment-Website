import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router";
import Button from 'react-bootstrap/Button';
const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container>
                <NavLink to='/' className='navbar-brand ms-5'>Bookla</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link '>Home</NavLink>
                        <NavLink to="/booking" className='nav-link '>Booking</NavLink>
                        <NavLink to="/appointment" className='nav-link '>Appointment</NavLink>
                        <NavLink to="/contact" className='nav-link '>Contact</NavLink>
                    </Nav>
                    <Nav className='btn-login-signup'>
                        <Button variant="light" className='btn-login'>Log in</Button>
                        <Button variant="dark" className='btn-signup'>Sign up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;