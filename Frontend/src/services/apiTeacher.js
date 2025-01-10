import axios from '../utils/axiosCustomize'

const addTeacherSchedules = async (date, hour, minute, second) => {
    const result = await axios.post(`api/addTeacherSchedules`,
        {
            date: date,
            hour: hour,
            minute: minute,
            second: second
        });
    return result;
}

const updateTeacherSchedules = async (date, currTime, hour, minute, second) => {
    const result = await axios.post(`api/updateTeacherSchedules`,
        {
            date: date,
            currTime: currTime,
            hour: hour,
            minute: minute,
            second: second
        });
    return result;
}

const deleteTeacherSchedules = async (date, time) => {
    const result = await axios.post(`api/deleteTeacherSchedules`,
        {
            date: date,
            time: time
        });
    return result;
}

const getAllTeacherAppointments = async () => {
    const result = await axios.get(`api/getAllTeacherAppointments`);
    return result;
}
const getTeacherAppointmentsByStatus = async (status) => {
    const params = {
        status: status
    }
    const result = await axios.get(`api/getTeacherAppointmentsByStatus`, { params });
    return result;
}

const changeStatusOfAppointment = async (appointmentId, status, note) => {
    const result = await axios.post(`api/changeStatusOfAppointment/${appointmentId}`,
        {
            status: status,
            note: note
        }
    );
    return result;
}

export {
    addTeacherSchedules,
    updateTeacherSchedules,
    deleteTeacherSchedules,
    changeStatusOfAppointment,
    getTeacherAppointmentsByStatus,
    getAllTeacherAppointments,
};