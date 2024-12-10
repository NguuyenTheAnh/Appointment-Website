import express from 'express';
import { apiGetAllTeachers, apiFilterTeachers, apiSearchTeachers, apiGetTeacherInfo } from '../controllers/studentController.js';

const router = express.Router();

// >>> 1 
// render teachers (combine paginate)
router.get("/api/allTeachers", apiGetAllTeachers); //get all teachers
router.get("/api/filterTeachers/:department_id", apiFilterTeachers); // filter teachers by department
router.get("/api/searchTeachers", apiSearchTeachers); // search teachers in list teachers current

// >>> 2
// render teacher's schedules, info
router.get("/api/teacherInfo/:teacherId", apiGetTeacherInfo); // get teacher info when had teacher'id



export { router };