import { db } from '../config/database.js'

const getAllTeacher = async () => {
    const { rows } = await db.query(
        `SELECT * FROM users WHERE role_id=2;`
    );
    return rows;
}

export { getAllTeacher };