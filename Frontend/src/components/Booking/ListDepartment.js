import ListGroup from 'react-bootstrap/ListGroup';
import { getAllTeachers, filterTeachers } from '../../services/apiStudent';
import { useEffect, useState } from 'react';
import Paginate from './Paginate';

const Department = (props) => {

    const { listTeacher, setListTeacher,
        isShowPageDepartment, setShowPageDepartment,
        isShowPageListTeacher, setShowPageListTeacher
    } = props;
    const [departmentId, setDepartmentId] = useState(0);
    const [pageCurr, setPageCurr] = useState(1);
    const [pages, setPages] = useState([]);
    const [active, setActive] = useState(false);
    const [activeFilter, setActiveFilter] = useState(true);

    // fetch filtered teacher
    const fetchDataListFilteredTeacher = async (departmentId, pageCurr) => {
        const res = await filterTeachers(departmentId, pageCurr);
        setListTeacher(res.data?.teachers);
        let totalPages = res.data?.pageInfo?.totalPages;
        let listPages = [];
        for (let i = 1; i <= totalPages; i++) listPages.push(i);
        setPages(listPages);
    }

    // fetch all teachers
    const fetchDataListTeacher = async (pageCurr) => {
        const res = await getAllTeachers(pageCurr);
        setListTeacher(res.data?.teachers);
        let totalPages = res.data?.pageInfo?.totalPages;
        let listPages = [];
        for (let i = 1; i <= totalPages; i++) listPages.push(i);
        setPages(listPages);
    }
    // to control change of page current of a specific department
    useEffect(() => {
        if (active && activeFilter) { // use active to avoid conflict useEffect()
            fetchDataListFilteredTeacher(departmentId, pageCurr);
        }
    }, [pageCurr, departmentId]);

    // after getting all teachers, follow the page current
    useEffect(() => {
        if (!activeFilter && active) {
            fetchDataListTeacher(pageCurr);
        }
    }, [pageCurr]);

    return (
        <>
            <ListGroup className='list-department'>
                <div className='header'>
                    <p
                        onClick={() => {
                            setPageCurr(1);
                            fetchDataListTeacher(1);
                            setActiveFilter(false);
                            setDepartmentId(0);
                        }}
                    >
                        <b>Department</b>
                    </p>
                </div>
                <div className='content'>
                    {[
                        'Khoa Khoa học và Công nghệ Giáo dục',
                        'Khoa Ngoại ngữ',
                        'Khoa Vật lý Kỹ thuật',
                        'Khoa Toán - Tin',
                        'Trường Kinh tế',
                        'Trường Vật liệu',
                        'Trường Hoá và Khoa học sự sống',
                        'Trường Điện - Điện tử',
                        'Trường Công nghệ Thông tin và Truyền thông',
                        'Trường Cơ khí',
                        'Khoa Lý luận Chính trị',
                        'Khoa Giáo dục Thể chất',
                        'Khoa Giáo dục Quốc phòng & An ninh',
                    ].map((item, index) => (
                        <ListGroup.Item className='item' key={index + 1} active={(index + 1) === departmentId}
                            onClick={() => {
                                fetchDataListFilteredTeacher((index + 1), pageCurr);
                                setDepartmentId(index + 1);
                                setPageCurr(1);
                                setShowPageDepartment(true);
                                setShowPageListTeacher(false);
                                setActive(true);
                            }}
                        >
                            {item}
                        </ListGroup.Item>
                    ))}
                </div>
            </ListGroup>
            {isShowPageDepartment && <Paginate pages={pages} pageCurr={pageCurr} setPageCurr={setPageCurr} />}
            {/* <Paginate pages={pages} pageCurr={pageCurr} setPageCurr={setPageCurr} /> */}
        </>
    );
}

export default Department;