import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Purchase", // This refers to the purchaseSchema
        }
    ]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
