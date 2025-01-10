import { db } from '../config/database.js';

// had get schedule in api student, student service

// create, delete and update
const getDayOfWeekAbbreviation = (dateString) => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
};
const addTeacherSchedules = async (teacherId, date, hour, minute, second) => {
    let newHour = parseInt(hour, 10);
    let newMinute = parseInt(minute, 10);
    let newSecond = parseInt(second, 10);

    let newHourToString = (newHour < 10) ? `0${newHour}` : `${newHour}`;
    let newMinuteToString = (newMinute < 10) ? `0${newMinute}` : `${newMinute}`;
    let newSecondToString = (newSecond < 10) ? `0${newSecond}` : `${newSecond}`;
    let newTime = `${newHourToString}:${newMinuteToString}:${newSecondToString}`;
    const { rows } = await db.query(
        `insert into schedules(teacher_id,day, start_time, date_next_week)
         values ($1,$2,$3,$4)
         returning *`,
        [teacherId, getDayOfWeekAbbreviation(date), newTime, date]
    );
    return rows[0];
}

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

    const searchScheduleId = await db.query(
        `select id
         from schedules
         where teacher_id = $1
         and date_next_week =  $2
         and start_time = $3`,
        [teacherId, date, time]
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
        `delete from schedules
         where teacher_id = $1
         and date_next_week = $2
         and start_time = $3
         returning * `,
        [teacherId, date, time]
    );
    return rows[0];
}

const getAllTeacherAppointments = async (teacherId) => {
    let { rows } = await db.query(
        `select appointments.id as appointment_id , status , note_student , note_teacher ,day, start_time, date_next_week as date, student_id ,  name, email, phone, image
         from appointments
         join schedules on schedules.id = appointments.schedule_id 
         join users on users.id  = appointments.student_id 
         where teacher_id = $1
         order by appointments.id desc`,
        [teacherId]
    );
    rows = rows.map((item) => {
        const localDate = new Date(item.date);
        const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
        const formattedDate = formatter.format(localDate);
        return { ...item, date: formattedDate };
    });
    return rows;
}

const getTeacherAppointmentsByStatus = async (teacherId, status) => {
    let { rows } = await db.query(
        `select appointments.id as appointment_id , status , note_student , note_teacher ,day, start_time, date_next_week as date, student_id ,  name, email, phone, image
         from appointments
         join schedules on schedules.id = appointments.schedule_id 
         join users on users.id  = appointments.student_id 
         where teacher_id = $1
         and status = $2
         order by appointments.id desc;`,
        [teacherId, status]
    );
    rows = rows.map((item) => {
        const localDate = new Date(item.date);
        const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
        const formattedDate = formatter.format(localDate);
        return { ...item, date: formattedDate };
    });
    return rows;
}

const changeStatusOfAppointment = async (appointmentId, status, note) => {
    if (!note) {
        const { rows } = await db.query(
            `update appointments 
         set status = $1
         where id = $2 
         returning *;`,
            [status, appointmentId]
        );
        return rows[0];
    }
    else {
        const { rows } = await db.query(
            `update appointments 
         set status = $1, note_teacher = $2
         where id = $3 
         returning *;`,
            [status, note, appointmentId]
        );
        return rows[0];
    }
}


export {
    updateTeacherSchedules,
    deleteTeacherSchedules,
    addTeacherSchedules,
    getAllTeacherAppointments,
    getTeacherAppointmentsByStatus,
    changeStatusOfAppointment
};