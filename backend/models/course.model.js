import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,  // Ensure a course is always linked to a creator
    },
    lectures: [{   // 🔥 New field to store lecture references
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
    }],
}, {
    timestamps: true
});

export const Course = mongoose.model("Course", courseSchema);
