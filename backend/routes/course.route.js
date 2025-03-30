import express from "express";
import { courseDetails, createCourse, deleteCourse, getCourse, updateCourse, purchaseCourse, getPurchasedCourses } from "../controllers/course.controller.js";
import userMiddleware from "../middlewares/user.mid.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.post('/create', adminMiddleware, createCourse)
router.put('/update/:courseID', adminMiddleware, updateCourse)
router.delete('/delete/:courseID', adminMiddleware, deleteCourse)
router.get('/courses', getCourse)

router.post("/purchase", userMiddleware, purchaseCourse); // Buy a course
router.get("/purchased", userMiddleware, getPurchasedCourses); // Get purchased courses

router.get('/:courseId', courseDetails);
export default router; 