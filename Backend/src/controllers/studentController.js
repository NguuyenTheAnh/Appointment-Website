import { filterTeachers, getAllTeachers, searchTeachers } from '../services/studentServices.js';
import resData from '../helpers/jsonFormat.js'
import env from 'dotenv';

env.config();
const port = process.env.PORT || 8888;


const apiGetAllTeachers = async (req, res) => {
    try {
        let data = await getAllTeachers();
        data = data.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        });
        const result = resData(data, 0, 'Get all teachers successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiFilterTeachers = async (req, res) => {
    try {
        const department_id = req.params.department_id;
        let data = await filterTeachers(department_id);
        data = data.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        })
        const result = resData(data, 0, 'Get all filtered teachers successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiSearchTeachers = async (req, res) => {
    try {
        const teacherName = req.body.teacherName;
        let data = await searchTeachers(teacherName);
        data = data.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        })
        const result = resData(data, 0, 'Get all filtered teachers successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}

export { apiGetAllTeachers, apiFilterTeachers, apiSearchTeachers }