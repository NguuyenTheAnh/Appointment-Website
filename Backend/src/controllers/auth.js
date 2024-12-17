import { register } from "../services/authServices.js";
import resData from '../helpers/jsonFormat.js';

const apiSignup = async (req, res) => {
    try {
        const resultUserData = await register(req.body);
        const result = resData({
            data: resultUserData.data,
            errorCount: resultUserData.errorCount,
            message: resultUserData.message
        });
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

export {
    apiSignup,
}