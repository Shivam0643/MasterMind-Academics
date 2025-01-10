import express from "express";
import { buyCourse, courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post('/create', createCourse)
router.put('/update/:courseID', updateCourse)
router.delete('/delete/:courseID', deleteCourse)
router.get('/courses', getCourse)
router.get('/:courseId', courseDetails);

router.post('/buy/:courseId', userMiddleware, buyCourse);

export default router;