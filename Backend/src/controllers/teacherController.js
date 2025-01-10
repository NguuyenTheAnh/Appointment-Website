import resData from '../helpers/jsonFormat.js';
import pagination from '../helpers/pagination.js';
import env from 'dotenv';
import {
    addTeacherSchedules,
    changeStatusOfAppointment,
    deleteTeacherSchedules,
    getAllTeacherAppointments,
    getTeacherAppointmentsByStatus,
    updateTeacherSchedules
} from '../services/teacherServices.js';

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
        if (!data) {
            const result = resData(data, 1, 'This time has been booked by student');
            return res.json(result);
        }
        const result = resData(data, 0, 'Delete time successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiAddTeacherSchedules = async (req, res) => {
    try {
        const { date, hour, minute, second } = req.body;
        let data = await addTeacherSchedules(req.user.id, date, hour, minute, second);
        const result = resData(data, 0, 'Add time successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiGetAllTeacherAppointments = async (req, res) => {
    try {
        let data = await getAllTeacherAppointments(req.user.id);
        data = data.map((element) => {
            return { ...element, image: `http://localhost:${port}/images/${element.image}` }
        });
        const result = resData(data, 0, 'Get appointments successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiGetTeacherAppointmentsByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        let data = await getTeacherAppointmentsByStatus(req.user.id, status);
        data = data.map((element) => {
            return { ...element, image: `http://localhost:${port}/images/${element.image}` }
        });
        const result = resData(data, 0, 'Get appointments successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

const apiChangeStatusOfAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status, note } = req.body;
        let data = await changeStatusOfAppointment(appointmentId, status, note);
        const result = resData(data, 0, 'Change status successfully');
        return res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

export {
    apiUpdateTeacherSchedules,
    apiDeleteTeacherSchedules,
    apiAddTeacherSchedules,
    apiGetAllTeacherAppointments,
    apiGetTeacherAppointmentsByStatus,
    apiChangeStatusOfAppointment,
};