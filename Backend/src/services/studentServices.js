import { db } from '../config/database.js';

// remove VN accents
function removeVietnameseAccents(str) {
    return str.normalize("NFD") // Tách tổ hợp dấu
        .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
        .replace(/đ/g, 'd') // Thay đ -> d
        .replace(/Đ/g, 'D') // Thay Đ -> D
        .toLowerCase(); // Chuyển về chữ thường
}

// Student's services

const getAllTeachers = async () => {
    const { rows } = await db.query(
        `SELECT users.id, username, email, password, name, phone, address, image, department_id, department_name,role_id, role_name
         FROM users
         JOIN department ON department.id=users.department_id
         JOIN roles ON roles.id=users.role_id
         WHERE role_id=2
         ORDER BY users.id ASC;`
    );
    return rows;
}
const filterTeachers = async (department_id) => {
    const { rows } = await db.query(
        `SELECT users.id, username, email, password, name, phone, address, image, department_id, department_name,role_id, role_name
         FROM users
         JOIN department ON department.id=users.department_id
         JOIN roles ON roles.id=users.role_id
         WHERE role_id=2
         AND department_id=$1
         ORDER BY users.id ASC;`,
        [department_id]
    );
    return rows;
}
const searchTeachers = async (teacherName) => {
    const { rows } = await db.query(
        `SELECT users.id, username, email, password, name, phone, address, image, department_id, department_name,role_id, role_name
         FROM users
         JOIN department ON department.id=users.department_id
         JOIN roles ON roles.id=users.role_id
         WHERE role_id=2
         ORDER BY users.id ASC;`
    );
    const result = rows.filter((teacher) => {
        let name = removeVietnameseAccents(teacher.name);
        let subName = removeVietnameseAccents(teacherName)
        return name.includes(subName);
    })
    return result;
}
const getTeacherInfo = async (teacherId) => {
    const { rows } = await db.query(
        `SELECT users.id, username, email, name, phone, address, image, department_name
         FROM users
         JOIN department ON department.id=users.department_id
         JOIN roles ON roles.id=users.role_id
         WHERE role_id=2
         AND users.id=$1;`,
        [teacherId]
    );
    return rows;
}
const getTeacherSchedule = async (teacherId) => {
    const { rows } = await db.query(
        `SELECT *
         FROM schedules
         WHERE teacher_id=$1`,
        [teacherId]
    );
    return rows;
}

const booking = async (studentId, teacherId, time, date, note) => {
    const searchScheduleId = await db.query(
        `SELECT id 
         FROM schedules
         WHERE teacher_id = $1 AND start_time = $2 AND date_next_week = $3`,
        [teacherId, time, date]
    );
    const scheduleId = searchScheduleId.rows[0].id;
    const { rows } = await db.query(
        `INSERT INTO appointments(student_id,schedule_id, status, note_student)
         VALUES ($1,$2,$3,$4)
         RETURNING *`,
        [studentId, scheduleId, 'Pending', note]
    );
    return rows[0];
}

const updateProfile = async (userId, profileData) => {
    const { username, email, name, phone, departmentName, address } = profileData;
    if (departmentName) {
        const searchDepartmentId = await db.query(
            `SELECT id
             FROM department
             WHERE department_name = $1`,
            [departmentName]
        );
        let departmentId = searchDepartmentId.rows[0].id;
        const { rows } = await db.query(
            `UPDATE users
             SET username = $1, email = $2, name = $3, phone = $4, department_id = $5, address = $6
             WHERE users.id = $7
             RETURNING *`,
            [username, email, name, phone, departmentId, address, userId]
        );
        return rows[0];
    }
    else {
        const { rows } = await db.query(
            `UPDATE users
         SET username = $1, email = $2, name = $3, phone = $4, address = $5
         WHERE users.id = $6
         RETURNING *`,
            [username, email, name, phone, address, userId]
        );
        return rows[0];
    }
}

const getStudentAppointmentsPending = async (userId) => {
    let { rows } = await db.query(
        `select appointments.id as appointment_id , status , note_student , note_teacher ,day, start_time, date_next_week as date, teacher_id, name, email, phone, image, department_name
         from appointments
         join schedules on schedules.id = appointments.schedule_id
         join users on users.id =  schedules.teacher_id 
         join department on department.id= users.department_id
         where student_id = $1 and status = 'Pending'
         order by date_next_week desc;`,
        [userId]
    );
    return rows;
}

const getStudentAppointmentsAccepted = async (userId) => {
    let { rows } = await db.query(
        `select appointments.id as appointment_id , status , note_student , note_teacher ,day, start_time, date_next_week as date, teacher_id, name, email, phone, image
         from appointments
         join schedules on schedules.id = appointments.schedule_id
         join users on users.id =  schedules.teacher_id 
         where student_id = $1 and status = 'Accepted'
         order by date_next_week desc;`,
        [userId]
    );
    return rows;
}

const getStudentAppointmentsDeclined = async (userId) => {
    let { rows } = await db.query(
        `select appointments.id as appointment_id , status , note_student , note_teacher ,day, start_time, date_next_week as date, teacher_id, name, email, phone, image
         from appointments
         join schedules on schedules.id = appointments.schedule_id
         join users on users.id =  schedules.teacher_id 
         where student_id = $1 and status = 'Declined'
         order by date_next_week desc;`,
        [userId]
    );
    return rows;
}

export {
    getAllTeachers,
    filterTeachers,
    searchTeachers,
    getTeacherInfo,
    getTeacherSchedule,
    booking,
    updateProfile,
    getStudentAppointmentsPending,
    getStudentAppointmentsAccepted,
    getStudentAppointmentsDeclined,
};