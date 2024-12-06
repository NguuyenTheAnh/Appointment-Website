import express from 'express';
import { apiGetAllTeachers, apiFilterTeachers, apiSearchTeachers } from '../controllers/studentController.js';

const router = express.Router();

//>>> 1
router.get("/api/allTeachers", apiGetAllTeachers); //get all teachers
router.get("/api/filterTeachers/:department_id", apiFilterTeachers); // filter teachers by department
router.get("/api/searchTeachers", apiSearchTeachers)

export { router };