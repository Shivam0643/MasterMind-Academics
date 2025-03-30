import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// Add a lecture to a course
export const addLecture = async (req, res) => {
    try {
        const { title, videoUrl } = req.body; // Get video URL
        const { courseId } = req.params;

        if (!title || !videoUrl) {
            return res.status(400).json({ message: "Title and video URL are required" });
        }

        const lecture = new Lecture({ title, videoUrl, course: courseId });
        await lecture.save();

        res.status(201).json({ message: "Lecture added successfully", lecture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get all lectures for a course
export const getLectures = async (req, res) => {
    const { courseId } = req.params;
    console.log("📌 Fetching lectures for courseId:", courseId);

    try {
        const lectures = await Lecture.find({ course: new mongoose.Types.ObjectId(courseId) });

        console.log("✅ Found lectures:", lectures);
        res.status(200).json({ lectures });
    } catch (error) {
        console.error("❌ Error fetching lectures:", error);
        res.status(500).json({ 
            message: "Error fetching lectures", 
            error: error.message, // Log exact error message
            stack: error.stack // Log stack trace for debugging
        });
    }
};



// Delete a lecture
export const deleteLecture = async (req, res) => {
    const { lectureId } = req.params;

    try {
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({ error: "Lecture not found" });
        }

        // Remove lecture reference from course
        await Course.findByIdAndUpdate(lecture.courseId, {
            $pull: { lectures: lectureId },
        });

        res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {
        console.error("Error deleting lecture:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
