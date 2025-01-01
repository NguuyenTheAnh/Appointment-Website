import axios from '../utils/axiosCustomize'

const getAllTeachers = async (page) => {
    const params = {
        page: page
    }
    const { data } = await axios.get('api/allTeachers', { params });
    return data;
}

const filterTeachers = async (departmentId, page) => {
    const params = {
        page: page
    }
    const { data } = await axios.get(`api/filterTeachers/${departmentId}`, { params });
    return data;
}

const searchTeachers = async (name, page) => {
    const params = {
        teacherName: name,
        page: page
    }
    const { data } = await axios.get(`api/searchTeachers`, { params });
    return data;
}

const getTeacherInfo = async (teacherId) => {
    const { data } = await axios.get(`api/teacherInfo/${teacherId}`);
    return data;
}

const getTeacherSchedule = async (teacherId) => {
    const { data } = await axios.get(`api/teacherSchedule/${teacherId}`);
    return data;
}

const signup = async (email, password, role_id) => {
    const result = await axios.post(`api/signup`, { email: email, password: password, role_id: role_id });
    return result;
}

const login = async (email, password) => {
    const result = await axios.post(`api/login`, { email: email, password: password });
    return result;
}

const logout = async () => {
    const result = await axios.post(`api/logout`);
    return result;
}

const getStudentAppointmentsPending = async () => {
    const result = await axios.get(`api/getStudentAppointmentsPending`);
    return result;
}

const getStudentAppointmentsAccepted = async () => {
    const result = await axios.get(`api/getStudentAppointmentsAccepted`);
    return result;
}

const getStudentAppointmentsDeclined = async () => {
    const result = await axios.get(`api/getStudentAppointmentsDeclined`);
    return result;
}

const bookSchedule = async (teacherId, time, date, note) => {
    const result = await axios.post(`api/booking`,
        {
            teacherId: teacherId,
            time: time,
            date: date,
            note: note
        }
    );
    return result;
}

const updateProfile = async (username, email, name, phone, departmentName, address) => {
    const result = await axios.post(`api/updateProfile`,
        {
            username: username,
            email: email,
            name: name,
            phone: phone,
            departmentName: departmentName,
            address: address
        }
    );
    return result;
}

export {
    getAllTeachers,
    filterTeachers,
    searchTeachers,
    getTeacherInfo,
    getTeacherSchedule,
    signup,
    login,
    logout,
    getStudentAppointmentsPending,
    getStudentAppointmentsAccepted,
    getStudentAppointmentsDeclined,
    bookSchedule,
    updateProfile,
}