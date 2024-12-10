import React, { useState } from 'react';
import Department from './ListDepartment';
import './Booking.scss';
import ListTeacher from './ListTeacher';
import SearchTeacher from './SearchTeacher';

const Booking = () => {
    const [listTeacher, setListTeacher] = useState([]);
    const [isShowPageListTeacher, setShowPageListTeacher] = useState(true);
    const [isShowPageDepartment, setShowPageDepartment] = useState(false);
    return (
        <div className='booking' >
            <ListTeacher
                listTeacher={listTeacher} setListTeacher={setListTeacher}
                setShowPageListTeacher={setShowPageListTeacher}
                setShowPageDepartment={setShowPageDepartment}
                isShowPageDepartment={isShowPageDepartment}
                isShowPageListTeacher={isShowPageListTeacher}
            />
            <Department
                listTeacher={listTeacher} setListTeacher={setListTeacher}
                setShowPageListTeacher={setShowPageListTeacher}
                setShowPageDepartment={setShowPageDepartment}
                isShowPageDepartment={isShowPageDepartment}
                isShowPageListTeacher={isShowPageListTeacher}
            />
            <SearchTeacher
                listTeacher={listTeacher} setListTeacher={setListTeacher}
            />
        </div>
    );
};

export default Booking;