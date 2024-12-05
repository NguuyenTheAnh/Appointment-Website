import express from 'express';
import { apiGetAllTeacher } from '../controllers/userController.js';

const router = express.Router();

//get all teachers
router.get("/", apiGetAllTeacher);

export { router };