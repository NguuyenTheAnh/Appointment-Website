import { login, register } from "../services/authServices.js";
import resData from '../helpers/jsonFormat.js';

const apiSignup = async (req, res) => {
    try {
        const resultUserData = await register(req.body);
        const result = resData(
            resultUserData.data,
            resultUserData.errorCount,
            resultUserData.message
        );
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiLogin = async (req, res) => {
    try {
        const resultUserData = await login(req.body);

        res.cookie('jwt', resultUserData.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

        const result = resData(
            resultUserData.data,
            resultUserData.errorCount,
            resultUserData.message
        );
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        const result = resData('', 0, 'Logout successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

export {
    apiSignup,
    apiLogin,
    apiLogout,
}