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



const allowedOrigins = [
    process.env.FRONTEND_URL || "https://master-mind-academix.vercel.app",  // Ensure frontend is explicitly allowed
    "http://localhost:5173", // Local development URL
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options('*', cors()); // Enable preflight requests for all routes


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Handle preflight requests for all routes
app.options('*', cors()); // Enable preflight for all routes

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is missing in environment variables!");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};
// Call function before starting server
connectDB();

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
