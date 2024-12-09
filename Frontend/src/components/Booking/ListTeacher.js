import React, { useEffect } from 'react';
import { getAllTeachers } from '../../services/apiStudent';
import CardTeacher from './CardTeacher';

const ListTeacher = (props) => {
    const { listTeacher, setListTeacher } = props;
    useEffect(() => {
        fetchDataListTeacher();
    }, []);
    const fetchDataListTeacher = async () => {
        const res = await getAllTeachers();
        setListTeacher(res.data);
    }
    return (
        <div className='list-teacher'>
            {listTeacher.map((teacher, index) => {
                return (
                    <div key={index} className='item'>
                        {/* <p>{JSON.stringify(teacher)}</p> */}
                        <CardTeacher image={teacher.image} name={teacher.name} department={teacher.department_name} />
                    </div>)
            })}
        </div>
    );
};

export default ListTeacher;