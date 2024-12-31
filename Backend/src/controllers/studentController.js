import {
    filterTeachers,
    getAllTeachers,
    searchTeachers,
    getTeacherInfo,
    getTeacherSchedule
} from '../services/studentServices.js';
import resData from '../helpers/jsonFormat.js';
import pagination from '../helpers/pagination.js';
import env from 'dotenv';

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
//next week
const getDayOfNextWeek = () => {
    const today = new Date();
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const currentDay = today.getDay(); // 0: SUN, 1: MON, ...
    const daysToNextMonday = currentDay === 0 ? 1 : 8 - currentDay;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysToNextMonday);

    // Get days from MON to SUN with full date
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(nextMonday);
        day.setDate(nextMonday.getDate() + i);

        // Format date as YYYY-MM-DD
        const formattedDate = day.toISOString().split("T")[0];

        weekDays.push({
            dayName: daysOfWeek[i], // Day name
            date: formattedDate // Full date in YYYY-MM-DD
        });
    }
    return weekDays;
};

// func search time of day
const timeOfDay = (day, schedules) => {
    let listDayOfNextWeek = getDayOfNextWeek();
    const listDay = schedules.filter((schedule) => {
        return schedule.day == day && listDayOfNextWeek.find((item) => item.date == schedule.date_next_week.toISOString().split("T")[0])
    });
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
        let listDayOfNextWeek = getDayOfNextWeek();
        let listDay = [
            { ...listDayOfNextWeek[0], listStartTime: timeOfDay('MON', schedules) },
            { ...listDayOfNextWeek[1], listStartTime: timeOfDay('TUE', schedules) },
            { ...listDayOfNextWeek[2], listStartTime: timeOfDay('WED', schedules) },
            { ...listDayOfNextWeek[3], listStartTime: timeOfDay('THU', schedules) },
            { ...listDayOfNextWeek[4], listStartTime: timeOfDay('FRI', schedules) },
            { ...listDayOfNextWeek[5], listStartTime: timeOfDay('SAT', schedules) },
            { ...listDayOfNextWeek[6], listStartTime: timeOfDay('SUN', schedules) }
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