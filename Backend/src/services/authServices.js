import { db } from '../config/database.js';
import bcrypt from 'bcryptjs';

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
        `SELECT password
         FROM users
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

    //json
    return {
        data: userData,
        errorCount: 0,
        message: 'Login successfully'
    };
}
export {
    register,
    login,
}