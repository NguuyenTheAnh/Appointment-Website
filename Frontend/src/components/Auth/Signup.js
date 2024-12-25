import React, { useState } from 'react';
import imageURL from '../../assets/images/signup.png';
import './Signup.scss';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { signup } from '../../services/apiStudent';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roleId, setRoleId] = useState(1);
    const defaultInputs = {
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [objCheckInputs, setObjCheckInputs] = useState(defaultInputs);
    const navigate = useNavigate();

    const checkValidEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleClickSignup = async () => {
        setObjCheckInputs(defaultInputs);
        let userData = { email, password, confirmPassword };
        // validate
        if (!checkValidEmail(userData.email)) {
            toast.error('Email is invalid');
            setObjCheckInputs({ ...defaultInputs, isValidEmail: false });
            return;
        }
        if (!userData.password) {
            toast.error('Enter your password');
            setObjCheckInputs({ ...defaultInputs, isValidPassword: false });
            return;
        }
        if (userData.confirmPassword != userData.password) {
            toast.error('Error confirm password');
            setObjCheckInputs({ ...defaultInputs, isValidConfirmPassword: false });
            return;
        }

        // call api
        let response = await signup(email, password, roleId);
        if (response.data.errorCount == 0) {
            toast.success(response.data.message);
            navigate('/login')
        }
        else toast.error(response.data.message);

    }
    const handleClickLogin = () => {
        navigate('/login');
    }
    const handleCheckBox = (event) => {
        if (event.target.checked) {
            setRoleId(2);
        }
        else setRoleId(1);
    }
    return (
        <div className='signup'>
            <img src={imageURL} />
            <div className='main-container'>
                <div className='header'>
                    <h4>Bookla</h4>
                    <div className='had-account'>
                        <p>Already have an account?</p>
                        <Button variant="light" onClick={() => handleClickLogin()}>Log in</Button>
                    </div>
                </div>
                <div className='content'>
                    <div className='title-login'>
                        <h1>Bookla</h1>
                        <p>Welcome to Bookla</p>
                    </div>
                    <div className='auth'>
                        <h6>Email</h6>
                        <input
                            type='email'
                            placeholder='abc@gmail.com'
                            value={email}
                            className={objCheckInputs.isValidEmail ? 'auth-input' : 'form-control is-invalid auth-input'}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <h6>Password</h6>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            className={objCheckInputs.isValidPassword ? 'auth-input' : 'form-control is-invalid auth-input'}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <h6>Confirm Password</h6>
                        <input
                            type='password'
                            placeholder='Re-enter your password'
                            value={confirmPassword}
                            className={objCheckInputs.isValidConfirmPassword ? 'auth-input confirm-password' : 'form-control is-invalid confirm-password auth-input'}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        <div className="form-check">
                            <label className="form-check-label" >Are you a teacher? </label>
                            <input type="checkbox" className="form-check-input"
                                onChange={(event) => handleCheckBox(event)}
                            />
                        </div>
                    </div>
                    <Button
                        variant="dark"
                        onClick={() => handleClickSignup()}
                    >
                        Create a free account
                    </Button>
                    <span onClick={() => navigate('/')}> &#60;&#60; Go to HomePage</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;