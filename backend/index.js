import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from './routes/course.route.js';
import lectureRoute from './routes/lecture.route.js';
import quizRoute from './routes/quiz.route.js'
import userRoute from './routes/user.route.js';
import adminRoute from './routes/admin.route.js';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();



// Configure CORS to allow the frontend URL dynamically
const allowedOrigins = [
    process.env.FRONTEND_URL,   // The dynamic frontend URL from environment variable
    "http://localhost:5173",    // Local development URL
];

// Allow all origins in development
if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('*'); // This will accept any origin in development
}

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Reject the request
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Handle preflight requests for all routes
app.options('*', cors()); // Enable preflight for all routes

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI;

try {
    await mongoose.connect(DB_URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log(error);
}

// Defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/course/courses", courseRoute);
app.use("/api/v1/lectures", lectureRoute)
app.use("/api/v1/quiz", quizRoute)
app.use("/api/v1/user", userRoute);
app.use('/api/v1/admin', adminRoute);

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
