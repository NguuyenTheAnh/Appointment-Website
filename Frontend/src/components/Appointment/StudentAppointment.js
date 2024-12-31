import React from 'react';
import StudentSidebar from './StudentSidebar';

const StudentAppointment = () => {
    return (
        <div className='appointment-student'>
            <div className='appointment-sidebar'>
                <StudentSidebar />
            </div>
            <div className='appointment-content'>
                <div className='appointment-header'>

                </div>
                <div className='appointment-body'>

                </div>
            </div>
        </div>
    );
};

export default StudentAppointment;