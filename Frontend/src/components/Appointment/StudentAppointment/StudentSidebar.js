import React, { useState } from 'react';
import { getStudentAppointmentsAccepted, getStudentAppointmentsDeclined, getStudentAppointmentsPending } from '../../../services/apiStudent';

const StudentSidebar = (props) => {
    const { setListAppointments } = props;
    const [stuAppointmentActive, setStuAppointmentActive] = useState(false);
    const [bookedActive, setBookedActive] = useState(true);
    const [declinedActive, setDeclinedActive] = useState(false);

    const fetchDataBooked = async () => {
        const { data } = await getStudentAppointmentsPending();
        setListAppointments(data.data);
    }
    const fetchDataAppointment = async () => {
        const { data } = await getStudentAppointmentsAccepted();
        setListAppointments(data.data);
    }
    const fetchDataDeclined = async () => {
        const { data } = await getStudentAppointmentsDeclined();
        setListAppointments(data.data);
    }

    const handleClickStuAppointment = () => {
        //set show
        setStuAppointmentActive(true);
        setBookedActive(false);
        setDeclinedActive(false);
        fetchDataAppointment();
    }
    const handleClickBooked = () => {
        //set show
        setBookedActive(true);
        setStuAppointmentActive(false);
        setDeclinedActive(false);
        fetchDataBooked();
    }
    const handleClickDeclined = () => {
        //set show
        setDeclinedActive(true);
        setBookedActive(false);
        setStuAppointmentActive(false);
        fetchDataDeclined();
    }

    return (
        <div>
            <div className='header'>
                <span>Student</span>
            </div>
            <div className='content'>
                <div
                    className={bookedActive ? 'selection active' : 'selection'}
                    onClick={handleClickBooked}
                >
                    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>Booked</p>
                </div>
                <div
                    className={stuAppointmentActive ? 'selection active' : 'selection'}
                    onClick={handleClickStuAppointment}
                >
                    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p>Appointments</p>
                </div>
                <div
                    className={declinedActive ? 'selection active' : 'selection'}
                    onClick={handleClickDeclined}
                >
                    <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 13L14 17M14 13L10 17M3 9H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>Declined</p>
                </div>
            </div>
        </div>
    );
};

export default StudentSidebar;