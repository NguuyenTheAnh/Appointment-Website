import axios from '../utils/axiosCustomize'

const getAllTeachers = async () => {
    const { data } = await axios.get('api/allTeachers');
    return data;
}

const filterTeachers = async (departmentId) => {
    const { data } = await axios.get(`api/filterTeachers/${departmentId}`);
    return data;
}

const searchTeachers = async (name) => {
    const params = {
        teacherName: name
    }
    const { data } = await axios.get(`api/searchTeachers`, { params });
    return data;
}

export { getAllTeachers, filterTeachers, searchTeachers }