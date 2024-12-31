import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import SelectionSchedule from './SelectionSchedule';
import SelectionAppointment from './SelectionAppointment';

const TeacherAppointment = () => {
    const [showSchedule, setShowSchedule] = useState(false);
    const [showAppointment, setShowAppointment] = useState(true);

    return (
        <div className='appointment-teacher'>
            <div className='appointment-sidebar'>
                <TeacherSidebar setShowAppointment={setShowAppointment} setShowSchedule={setShowSchedule} />
            </div>
            <>
                {
                    showAppointment &&
                    <SelectionAppointment />
                }
            </>
            <>
                {showSchedule &&
                    <SelectionSchedule />
                }
            </>
        </div>
    );
};

export default TeacherAppointment;