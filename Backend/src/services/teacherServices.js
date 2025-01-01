import { db } from '../config/database.js';

// had get schedule in api student, student service

// delete and update
const updateTeacherSchedules = async (teacherId, date, currTime, hour, minute, second) => {
    let newHour = parseInt(hour, 10);
    let newMinute = parseInt(minute, 10);
    let newSecond = parseInt(second, 10);

    let newHourToString = (newHour < 10) ? `0${newHour}` : `${newHour}`;
    let newMinuteToString = (newMinute < 10) ? `0${newMinute}` : `${newMinute}`;
    let newSecondToString = (newSecond < 10) ? `0${newSecond}` : `${newSecond}`;
    let newTime = `${newHourToString}:${newMinuteToString}:${newSecondToString}`;

    const searchScheduleId = await db.query(
        `select id
         from schedules
         where teacher_id = $1
         and date_next_week =  $2
         and start_time = $3`,
        [teacherId, date, currTime]
    );
    const searchAppointment = await db.query(
        `select schedule_id
         from appointments
         where schedule_id = $1`,
        [searchScheduleId.rows[0].id]
    );
    if (searchAppointment.rows.length != 0) {
        return '';
    }
    const { rows } = await db.query(
        `update schedules
         set start_time = $1
         where teacher_id = $2 
         and date_next_week = $3
         and start_time = $4 
         returning *`,
        [newTime, teacherId, date, currTime]
    );
    return rows[0];
}

const deleteTeacherSchedules = async (teacherId, date, time) => {
    const { rows } = await db.query(
        `delete from schedules
         where teacher_id = $1
         and date_next_week = $2
         and start_time = $3
         returning * `,
        [teacherId, date, time]
    );
    return rows[0];
}


export {
    updateTeacherSchedules,
    deleteTeacherSchedules,
};