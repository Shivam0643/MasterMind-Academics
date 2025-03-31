import { Quiz } from '../models/quiz.model.js';
import { Course } from '../models/course.model.js';
import mongoose from 'mongoose';

export const addQuiz = async (req, res) => {
    try {
        const { title, quizUrl } = req.body;
        const { courseId } = req.params;

        // Validate input
        if (!title || !quizUrl) {
            return res.status(400).json({ message: 'Title and Quiz URL are required.' });
        }

        // Check if the course exists
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Check if a quiz already exists for the course
        const existingQuiz = await Quiz.findOne({ course: courseId });
        if (existingQuiz) {
            return res.status(409).json({ message: 'A quiz already exists for this course. Please delete the existing quiz before adding a new one.' });
        }

        // Create and save the new quiz
        const quiz = new Quiz({ title, quizUrl, course: courseId });
        await quiz.save();

        res.status(201).json({ message: 'Quiz added successfully.', quiz });
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// get all quiz
export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('course', 'courseName');
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// get quiz by courseId
export const getQuizByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Ensure courseId is converted to ObjectId
        const quiz = await Quiz.findOne({ course: new mongoose.Types.ObjectId(courseId) });

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found for this course." });
        }

        res.status(200).json({ quiz });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// delete quiz 
export const deleteQuiz = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find and delete the quiz associated with the courseId
        const deletedQuiz = await Quiz.findOneAndDelete({ course: courseId });

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found for this course.' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully.', deletedQuiz });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
