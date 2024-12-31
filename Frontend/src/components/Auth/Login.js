import React, { useState } from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import imageURL from '../../assets/images/schedule.png';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { login } from '../../services/apiStudent';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const defaultInputs = {
        isValidEmail: true,
        isValidPassword: true,
    }
    const [objCheckInputs, setObjCheckInputs] = useState(defaultInputs);
    const checkValidEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleClickLogin = async () => {
        setObjCheckInputs(defaultInputs);
        let userData = { email, password };
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
        // call api
        const { data } = await login(email, password);
        if (data.errorCount == 0) {
            dispatch(doLogin(data));
            toast.success(data.message);
            navigate('/');
        }
        else toast.error(data.message);

    }
    const handleClickSignup = () => {
        navigate('/signup');
    }
    const handlePressEnter = (event) => {
        if (event.code == "Enter") {
            handleClickLogin();
        }
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
                            className={objCheckInputs.isValidEmail ? '' : 'form-control is-invalid'}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <h6>Password</h6>
                        <input
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            className={objCheckInputs.isValidPassword ? '' : 'form-control is-invalid'}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
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