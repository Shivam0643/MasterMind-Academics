import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGO_URI

try {
    await mongoose.connect(DB_URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    res.send(`Server is running at port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
