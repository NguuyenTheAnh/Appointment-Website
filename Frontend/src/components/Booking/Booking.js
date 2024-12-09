import React, { useState } from 'react';
import Department from './ListDepartment';
import Paginate from './Paginate';
import './Booking.scss';
import ListTeacher from './ListTeacher';
import SearchTeacher from './SearchTeacher';

const Booking = () => {
    const [listTeacher, setListTeacher] = useState([]);
    return (
        <div className='booking' >
            <SearchTeacher listTeacher={listTeacher} setListTeacher={setListTeacher} />
            <ListTeacher listTeacher={listTeacher} setListTeacher={setListTeacher} />
            <Department listTeacher={listTeacher} setListTeacher={setListTeacher} />
            <Paginate />
        </div>
    );
};

export default Booking;