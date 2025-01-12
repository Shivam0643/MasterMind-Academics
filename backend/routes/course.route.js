import express from "express";
import { buyCourse, courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.post('/create', adminMiddleware, createCourse)
router.put('/update/:courseID', adminMiddleware, updateCourse)
router.delete('/delete/:courseID', adminMiddleware, deleteCourse)
router.get('/courses', getCourse)
router.get('/:courseId', courseDetails);

router.post('/buy/:courseId', userMiddleware, buyCourse);

export default router;