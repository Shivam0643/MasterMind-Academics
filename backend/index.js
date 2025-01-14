import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from './routes/course.route.js'
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
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
}))


const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI

try {
    await mongoose.connect(DB_URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log(error);
}

// Defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use('/api/v1/admin', adminRoute)

// cloudinary configuration code
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
