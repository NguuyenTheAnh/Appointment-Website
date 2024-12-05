import { getAllTeacher } from '../services/UserServices.js';
import resData from '../helpers/jsonFormat.js'

const apiGetAllTeacher = async (req, res) => {
    const result = resData();
    try {
        result.data = await getAllTeacher();
        result.error = 0;
        result.message = 'Get all teacher successful';
    } catch (error) {
        result.data = ['']
        result.error = 1;
        result.message = 'Server error';
    }
    res.json(result);
}

export { apiGetAllTeacher }