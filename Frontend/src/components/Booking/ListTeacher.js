import React, { useEffect, useState } from 'react';
import { getAllTeachers } from '../../services/apiStudent';
import CardTeacher from './CardTeacher';
import Paginate from './Paginate';
import { Link } from 'react-router-dom';

const ListTeacher = (props) => {
    const {
        listTeacher, setListTeacher,
        isShowPageDepartment, setShowPageDepartment,
        isShowPageListTeacher, setShowPageListTeacher
    } = props;

    const [pageCurr, setPageCurr] = useState(1);
    const [pages, setPages] = useState([]);


    useEffect(() => {
        fetchDataListTeacher(pageCurr);
    }, [pageCurr]);
    const fetchDataListTeacher = async (pageCurr) => {
        const res = await getAllTeachers(pageCurr);
        setListTeacher(res.data.teachers);
        let totalPages = res.data.pageInfo.totalPages;
        let listPages = [];
        for (let i = 1; i <= totalPages; i++) listPages.push(i);
        setPages(listPages);
    }
    return (
        <>
            <div className='list-teacher'>
                {listTeacher.map((teacher, index) => {
                    return (
                        <div key={index} className='item'>
                            <Link to={`/teacherInfo/${teacher.id}`} style={{ textDecoration: 'none' }}>
                                <CardTeacher image={teacher.image} name={teacher.name} department={teacher.department_name} />
                            </Link>
                        </div>
                    )
                })}
            </div>
            {isShowPageListTeacher && <Paginate pages={pages} pageCurr={pageCurr} setPageCurr={setPageCurr} />}
            {/* <Paginate pages={pages} pageCurr={pageCurr} setPageCurr={setPageCurr} /> */}
        </>
    );
};

export default ListTeacher;