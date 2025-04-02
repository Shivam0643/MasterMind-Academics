import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import courseRoute from "./routes/course.route.js";
import lectureRoute from "./routes/lecture.route.js";
import quizRoute from "./routes/quiz.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI;

// ✅ Configure CORS
const allowedOrigins = [];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}
allowedOrigins.push("http://localhost:5173"); // Always allow local development

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// ✅ Cloudinary Configuration (Set Before Using File Uploads)
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

// ✅ Connect to MongoDB (Fixing `await` issue)
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
connectDB(); // Call the function

// ✅ Define Routes (Removed Duplicate `/api/v1/course/courses`)
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/lectures", lectureRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
