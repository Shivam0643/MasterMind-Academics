import express from "express";
import { addLecture, getLectures, deleteLecture } from "../controllers/lecture.controller.js";
import adminMiddleware from '../middlewares/admin.mid.js'

const router = express.Router();

// Add a lecture (Admin only)
router.post("/:courseId/add", adminMiddleware, addLecture);

// Get lectures for a course
router.get("/:courseId/", getLectures);

// Delete a lecture (Admin only)
router.delete("/:courseId/delete/:lectureId", adminMiddleware, deleteLecture);


export default router;
