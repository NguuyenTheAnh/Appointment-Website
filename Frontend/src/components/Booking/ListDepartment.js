import ListGroup from 'react-bootstrap/ListGroup';
import { getAllTeachers, filterTeachers } from '../../services/apiStudent';
import { useEffect } from 'react';

const Department = (props) => {

    const { listTeacher, setListTeacher } = props;
    const fetchDataListFilteredTeacher = async (departmentId) => {
        const res = await filterTeachers(departmentId);
        setListTeacher(res.data);
    }
    const fetchDataListTeacher = async () => {
        const res = await getAllTeachers();
        setListTeacher(res.data);
    }
    return (
        <ListGroup className='list-department'>
            <div className='header'>
                <p onClick={() => { fetchDataListTeacher() }}><b>Department</b></p>
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
                    <ListGroup.Item className='item' key={index + 1} onClick={() => { fetchDataListFilteredTeacher(index + 1) }}>
                        {item}
                    </ListGroup.Item>
                ))}
            </div>
        </ListGroup>
    );
}

export default Department;