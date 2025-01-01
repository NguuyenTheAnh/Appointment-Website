import React, { useEffect } from 'react';
import {
    Route,
    Routes,
    useNavigate
} from 'react-router-dom';
import App from './App';
import HomePage from './components/Home/HomePage';
import Booking from './components/Booking/Booking';
import Appointment from './components/Appointment/Appointment';
import TeacherInfo from './components/TeacherInfo/TeacherInfo';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'; import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { setNavigate } from './services/navigateService';
import Profile from './components/Profile/Profile';


const RouteApp = () => {

    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate]);


    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='booking' element={<Booking />} />
                    <Route path='appointment' element={<Appointment />} />
                    <Route path='teacherInfo/:teacherId' element={<TeacherInfo />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default RouteApp;