import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentAppointment from './StudentAppointment/StudentAppointment';
import TeacherAppointment from './TeacherAppointment/TeacherAppointment';
import './Appointment.scss';

const Appointment = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    return (
        <>
            {
                account.role_name == "Teacher"
                    ?
                    <TeacherAppointment accountTeacher={account} />
                    :
                    <StudentAppointment accountStudent={account} />
            }
        </>
    );
};

export default Appointment;