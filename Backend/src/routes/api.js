import express from 'express';
import {
    apiGetAllTeachers,
    apiFilterTeachers,
    apiSearchTeachers,
    apiGetTeacherInfo,
    apiGetTeacherSchedule,
    apiBooking,
    apiUpdateProfile,
    apiGetStudentAppointmentsPending,
    apiGetStudentAppointmentsAccepted,
    apiGetStudentAppointmentsDeclined
} from '../controllers/studentController.js';
import { apiLogin, apiLogout, apiSignup } from '../controllers/authController.js';
import { checkUserJWT, checkUserPermission } from '../middleware/jwtAction.js';
import { apiDeleteTeacherSchedules, apiUpdateTeacherSchedules } from '../controllers/teacherController.js';

const router = express.Router();

// >>> 1 
// render teachers (combine paginate)
router.get("/api/allTeachers", checkUserJWT, checkUserPermission, apiGetAllTeachers); //get all teachers
router.get("/api/filterTeachers/:department_id", checkUserJWT, checkUserPermission, apiFilterTeachers); // filter teachers by department
router.get("/api/searchTeachers", checkUserJWT, checkUserPermission, apiSearchTeachers); // search teachers in list teachers current

// >>> 2
// render teacher's schedules, info
router.get("/api/teacherInfo/:teacherId", checkUserJWT, checkUserPermission, apiGetTeacherInfo); // get teacher info when had teacher'id
router.get("/api/teacherSchedule/:teacherId", checkUserJWT, apiGetTeacherSchedule); // get teacher's schedule
// make a appointment
router.post("/api/booking", checkUserJWT, checkUserPermission, apiBooking);
// update profile
router.post("/api/updateProfile", checkUserJWT, apiUpdateProfile);
// get student's appointment
router.get("/api/getStudentAppointmentsPending", checkUserJWT, apiGetStudentAppointmentsPending);
router.get("/api/getStudentAppointmentsAccepted", checkUserJWT, apiGetStudentAppointmentsAccepted);
router.get("/api/getStudentAppointmentsDeclined", checkUserJWT, apiGetStudentAppointmentsDeclined);


// >>> 3
// authentication
router.post("/api/signup", apiSignup); //register
router.post("/api/login", apiLogin) //login
router.post("/api/logout", apiLogout) //logout

// teacher
router.post("/api/updateTeacherSchedules", checkUserJWT, apiUpdateTeacherSchedules);
router.post("/api/deleteTeacherSchedules", checkUserJWT, apiDeleteTeacherSchedules);

// >>> 1
// schedules



export { router };