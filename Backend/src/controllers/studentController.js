import {
    filterTeachers,
    getAllTeachers,
    searchTeachers,
    getTeacherInfo,
    getTeacherSchedule
} from '../services/studentServices.js';
import resData from '../helpers/jsonFormat.js'
import env from 'dotenv';
import pagination from '../helpers/pagination.js';

env.config();
const port = process.env.PORT || 8888;


const apiGetAllTeachers = async (req, res) => {
    try {
        let dataTeachers = await getAllTeachers();
        dataTeachers = dataTeachers.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        });

        //paginate
        const page = req.query.page;
        const limit = req.query.limit;
        const paginate = pagination(parseInt(page), parseInt(limit), dataTeachers);
        const data = {
            teachers: paginate.newItems,
            pageInfo: paginate.pageInfo
        }
        const result = resData(data, 0, 'Get all teachers successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiFilterTeachers = async (req, res) => {
    try {
        const department_id = parseInt(req.params.department_id);
        let dataTeachers = await filterTeachers(department_id);
        dataTeachers = dataTeachers.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        })
        //paginate
        const page = req.query.page;
        const limit = req.query.limit;
        const paginate = pagination(parseInt(page), parseInt(limit), dataTeachers);
        const data = {
            teachers: paginate.newItems,
            pageInfo: paginate.pageInfo
        }
        const result = resData(data, 0, 'Get all filtered teachers successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiSearchTeachers = async (req, res) => {
    try {
        const teacherName = req.query.teacherName;
        let dataTeachers = await searchTeachers(teacherName);
        dataTeachers = dataTeachers.map((item) => {
            item.image = `http://localhost:${port}/images/${item.image}`;
            return item;
        })
        //paginate
        const page = req.query.page;
        const limit = req.query.limit;
        const paginate = pagination(parseInt(page), parseInt(limit), dataTeachers);
        const data = {
            teachers: paginate.newItems,
            pageInfo: paginate.pageInfo
        }
        const result = resData(data, 0, 'Search teachers by name successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
const apiGetTeacherInfo = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await getTeacherInfo(teacherId);
        teacher[0].image = `http://localhost:${port}/images/${teacher[0].image}`;
        const result = resData(teacher[0], 0, 'Get teacher info successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
// func search time of day
const timeOfDay = (day, schedules) => {
    const listDay = schedules.filter((schedule) => schedule.day == day);
    let listTime = [];
    listDay.forEach(element => {
        listTime.push(element.start_time);
    });
    listTime.sort((a, b) => {
        return a.localeCompare(b); // sort start time asc
    });
    return listTime;
}
const apiGetTeacherSchedule = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const schedules = await getTeacherSchedule(teacherId);
        let listDay = [
            { dayName: 'MON', listStartTime: timeOfDay('MON', schedules) },
            { dayName: 'TUE', listStartTime: timeOfDay('TUE', schedules) },
            { dayName: 'WED', listStartTime: timeOfDay('WED', schedules) },
            { dayName: 'THU', listStartTime: timeOfDay('THU', schedules) },
            { dayName: 'FRI', listStartTime: timeOfDay('FRI', schedules) },
            { dayName: 'SAT', listStartTime: timeOfDay('SAT', schedules) },
            { dayName: 'SUN', listStartTime: timeOfDay('SUN', schedules) }
        ]
        const result = resData(listDay, 0, 'Get schedules successfully');
        res.json(result);
    } catch (error) {
        console.log('Error getting: ', error);
        res.status(500).json(resData('', 1, 'Server error'));
    }
}
export {
    apiGetAllTeachers,
    apiFilterTeachers,
    apiSearchTeachers,
    apiGetTeacherInfo,
    apiGetTeacherSchedule
}