import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { logout } from '../services/apiStudent';
import { useDispatch } from 'react-redux';
import { doLogout } from '../redux/action/userAction';
import { toast } from 'react-toastify';

const Header = () => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('/login')
    }
    const handleClickSignup = () => {
        navigate('/signup');
    }
    const handleClickLogout = async () => {
        // call api log out
        const { data } = await logout();
        if (data.errorCount == 0) {
            dispatch(doLogout());
            toast.success(data.message);
            navigate('/');
        }
        else toast.error(data.message);
    }
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
                    </Nav>
                    <Nav className='btn-login-signup'>
                        {isAuthenticated == false
                            ?
                            <>
                                <Button variant="light" className='btn-login' onClick={() => handleClickLogin()}>Log in</Button>
                                <Button variant="dark" className='btn-signup' onClick={() => handleClickSignup()}>Sign up</Button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => handleClickLogout()} >Log out</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                            </NavDropdown>
                        }



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;