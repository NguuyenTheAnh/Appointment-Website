import { db } from '../config/database.js'

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
         WHERE role_id=2;`
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
         AND department_id=$1;`,
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
         WHERE role_id=2;`
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

export {
    getAllTeachers,
    filterTeachers,
    searchTeachers,
    getTeacherInfo,
    getTeacherSchedule
};