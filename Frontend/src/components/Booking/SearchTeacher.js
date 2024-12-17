import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { searchTeachers } from '../../services/apiStudent';


const SearchTeacher = (props) => {
    const { listTeacher, setListTeacher } = props;
    const [name, setName] = useState('');
    const fetchDataSearchedTeachers = async () => {
        const res = await searchTeachers(name);
        let newListTeacher = listTeacher.filter((teacher) => {
            return res.data.teachers.findIndex((element) => element.id === teacher.id) != -1
        });
        console.log(newListTeacher);
        setListTeacher(newListTeacher);
        setName('');
    }

    return (
        <div className='search-teacher'>
            <div className='search-bar'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
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