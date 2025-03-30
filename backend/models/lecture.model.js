import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Store URL instead of file
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
});

export const Lecture = mongoose.model("Lecture", lectureSchema);
