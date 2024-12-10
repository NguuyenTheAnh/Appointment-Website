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

export { getAllTeachers, filterTeachers, searchTeachers }