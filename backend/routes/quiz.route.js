import express from "express";
import { addQuiz, getAllQuizzes, getQuizByCourseId, deleteQuiz } from "../controllers/quiz.controller.js";
import adminMiddleware from '../middlewares/admin.mid.js'
import userMiddleware from '../middlewares/user.mid.js'

const router = express.Router();

// Add a quiz (Admin only)
router.post("/:courseId/add", adminMiddleware, addQuiz);

// get all quiz
router.get('/all', adminMiddleware, getAllQuizzes);

// get quiz by courseId
router.get('/:courseId', getQuizByCourseId);

// delete quiz
router.delete('/:courseId/delete', adminMiddleware, deleteQuiz);

export default router;
