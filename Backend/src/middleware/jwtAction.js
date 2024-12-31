import jwt from 'jsonwebtoken';
import env from 'dotenv';
import resData from '../helpers/jsonFormat.js';
env.config();

const key = process.env.JWT_SECRET;

const createJWT = (payload) => {
    let token = null;
    try {
        token = jwt.sign(payload, key)
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyToken = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json(resData('', -1, 'Not authenticated the user'));
        }
    }
    else {
        return res.status(401).json(resData('', -1, 'Not authenticated the user'));
    }
}

const checkUserPermission = (req, res, next) => {
    if (req.user) {
        let role_name = req.user.role_name;

        if (role_name == 'Student') {
            next();
        }
        else {
            return res.status(403).json(resData('', -1, 'Not authorized the user'));

        }
    }
    else {
        return res.status(401).json(resData('', -1, 'Not authenticated the user'));

    }
}

export {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission,
}