import React, { useState } from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import imageURL from '../../assets/images/schedule.png';
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleClickLogin = () => {
        // validate

        // submit api
    }
    const handleClickSignup = () => {
        navigate('/signup');
    }
    return (
        <div className='login'>
            <div className='header'>
                <h4>Bookla</h4>
                <div className='not-account'>
                    <p>Don't have an account yet?</p>
                    <Button variant="light" onClick={() => handleClickSignup()}>Sign up</Button>
                </div>
            </div>
            <div className='main-container'>
                <div className='content'>
                    <div className='title-login'>
                        <h1>Bookla</h1>
                        <p>Hello, Who's this ?</p>
                    </div>
                    <div className='auth'>
                        <h6>Email</h6>
                        <input
                            type='email'
                            placeholder='abc@gmail.com'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <h6>Password</h6>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <Button
                        variant="dark"
                        onClick={() => handleClickLogin()}
                    >
                        Log in to Bookla
                    </Button>
                    <span onClick={() => navigate('/')}> &#60;&#60; Go to HomePage</span>
                </div>
                <div className='image'>
                    <img src={imageURL} />
                </div>
            </div>
        </div>
    );
};

export default Login;