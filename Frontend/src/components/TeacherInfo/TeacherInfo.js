import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeacherInfo } from '../../services/apiStudent';
import './TeacherInfo.scss';
import About from './About';
import Schedule from './Schedule';

const TeacherInfo = () => {
    const { teacherId } = useParams();
    const [teacherInfo, setTeacherInfo] = useState();

    const fetchDataTeacherInfo = async (teacherId) => {
        const { data } = await getTeacherInfo(teacherId);
        setTeacherInfo(data);
    }
    useEffect(() => {
        fetchDataTeacherInfo(teacherId);
    }, [])
    return (
        <div className='teacher-info'>
            <div className='image'>
                <img src={teacherInfo ? teacherInfo.image : ''} />
            </div>
            <div className='info'>
                {teacherInfo &&
                    <About teacherInfo={teacherInfo} />
                }
            </div>
            <div className='schedule'>
                {teacherInfo &&
                    <Schedule teacherId={teacherInfo.id} />
                }
            </div>
        </div>
    );
};

export default TeacherInfo;