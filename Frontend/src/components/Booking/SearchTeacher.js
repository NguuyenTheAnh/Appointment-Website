import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { searchTeachers } from '../../services/apiStudent';


const SearchTeacher = (props) => {
    const { listTeacher, setListTeacher } = props;
    const [name, setName] = useState('');
    const fetchDataSearchedTeachers = async () => {
        const res = await searchTeachers(name);
        let newListTeacher = listTeacher.filter((teacher) => {
            return res.data.findIndex((element) => element.id === teacher.id) != -1
        });
        console.log(newListTeacher);
        setListTeacher(newListTeacher);
        setName('');
    }

    return (
        <div className='search-teacher'>
            <div className='search-bar'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                    <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path><path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path><path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z" transform="rotate(-45.001 38.24 38.24)"></path><path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
                </svg>
                <input
                    type='text'
                    value={name}
                    placeholder='Enter Name'
                    onChange={(event) => { setName(event.target.value) }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            fetchDataSearchedTeachers();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SearchTeacher;