import express from "express";
import { courseDetails, createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post('/create', createCourse)
router.put('/update/:courseID', updateCourse)
router.delete('/delete/:courseID', deleteCourse)
router.get('/courses', getCourse)
router.get('/:courseId', courseDetails)

export default router;