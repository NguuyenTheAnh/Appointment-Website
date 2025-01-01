import resData from '../helpers/jsonFormat.js';
import pagination from '../helpers/pagination.js';
import env from 'dotenv';
import { deleteTeacherSchedules, updateTeacherSchedules } from '../services/teacherServices.js';

env.config();
const port = process.env.PORT || 8888;

const apiUpdateTeacherSchedules = async (req, res) => {
    try {
        const { date, currTime, hour, minute, second } = req.body;
        let data = await updateTeacherSchedules(req.user.id, date, currTime, hour, minute, second)
        if (!data) {
            const result = resData(data, 1, 'This time has been booked by student');
            return res.json(result);
        }
        const result = resData(data, 0, 'Update time successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiDeleteTeacherSchedules = async (req, res) => {
    try {
        const { date, time } = req.body;
        let data = await deleteTeacherSchedules(req.user.id, date, time)
        const result = resData(data, 0, 'Delete time successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

export {
    apiUpdateTeacherSchedules,
    apiDeleteTeacherSchedules,
};