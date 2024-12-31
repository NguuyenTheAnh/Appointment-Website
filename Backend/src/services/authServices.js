import { db } from '../config/database.js';
import bcrypt from 'bcryptjs';
import { createJWT } from '../middleware/jwtAction.js';
import env from 'dotenv';
env.config();
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async (email) => {
    const { rows } = await db.query(
        `SELECT *
         FROM users
         WHERE email=$1`,
        [email]
    );
    return (rows.length == 0) ? false : true;
}
const register = async (userData) => {
    // check email exists
    let isExistedEmail = await checkEmailExist(userData.email);
    if (isExistedEmail)
        return {
            data: '',
            errorCount: 1,
            message: 'Email is already exist'
        };

    // hash password
    let hashPassword = hashUserPassword(userData.password);

    // create new user
    const { rows } = await db.query(
        `INSERT INTO users(email,password,role_id)
         VALUES($1,$2,$3)
         RETURNING *`,
        [userData.email, hashPassword, userData.role_id]
    );
    return {
        data: rows[0],
        errorCount: 0,
        message: 'Register successfully'
    };
}
const login = async (userData) => {
    // check email exists
    let isExistedEmail = await checkEmailExist(userData.email);
    if (!isExistedEmail) {
        return {
            data: '',
            errorCount: 1,
            message: 'Email is not already exist'
        };
    }
    const { rows } = await db.query(
        `SELECT users.id, username, email, password, name, phone, address, image, department_name, role_name
         FROM users
         JOIN roles ON roles.id = users.role_id
         LEFT JOIN department ON department.id = users.department_id
         WHERE email=$1`,
        [userData.email]
    );

    //compare password
    const hashPassword = rows[0].password;
    if (!bcrypt.compareSync(userData.password, hashPassword)) {
        return {
            data: '',
            errorCount: 1,
            message: 'Incorrect password'
        };
    }

    //login
    let payload = {
        email: userData.email,
        role_name: rows[0].role_name,
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
    let token = createJWT(payload);
    return {
        data: {
            access_token: token,
            role: rows[0].role_name,
            username: rows[0].username,
            email: rows[0].email,
            name: rows[0].name,
            phone: rows[0].phone,
            address: rows[0].address,
            department_name: rows[0].department_name,
            role_name: rows[0].role_name,
            image: rows[0].image
        },
        errorCount: 0,
        message: 'Login successfully'
    };
}

export {
    register,
    login,
}