import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const key = process.env.JWT_SECRET;

const createJWT = () => {
    let payload = { username: 'anh', address: 'bn' };
    let token = null;
    try {
        token = jwt.sign(payload, key)
    } catch (error) {
        console.log(error);
    }
    console.log(token);
    return token;
}

const verifyToken = (token) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    console.log(decoded);
    return decoded;
}

export {
    createJWT,
    verifyToken,
}