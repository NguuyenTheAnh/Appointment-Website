import React from 'react';
import { useParams } from 'react-router-dom';

const TeacherInfo = () => {
    const { teacherId } = useParams();
    return (
        <div>
            {teacherId}
        </div>
    );
};

export default TeacherInfo;