import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

// course creation
export const createCourse = async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price } = req.body;
    try {
        if (!title || !description || !price) {
            return res.status(400).json({ errors: "All fields are required" })
        }
        const { image } = req.files
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ errors: "No file uploaded" })
        }

        const allowedFormat = ["image/png", "image/jpeg"]
        if (!allowedFormat.includes(image.mimetype)) {
            return res.status(400).json({ errors: "Invalid file format. Only PNG and JPG are allowed" })
        }

        // Cloudinary code
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)
        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ errors: "Error uploading file to cloudinary" })
        }

        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url,
            },
            creatorId: adminId
        }
        const course = await Course.create(courseData);
        res.json({
            message: "Course created successfully",
            course
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating course" })
    }
}

// course updation
export const updateCourse = async (req, res) => {
    const adminId = req.adminId
    const { courseId } = req.params;
    const { title, description, price, image } = req.body;

    try {
        const courseSearch = await Course.findById(courseId);
        if (!courseSearch) {
            return res.status(404).json({ errors: "Course not found" });
        }
        const course = await Course.updateOne({
            _id: courseId,
            creatorId: adminId,
        }, {
            title,
            description,
            price,
            image: {
                public_id: image?.public_id,
                url: image?.url,
            }
        })
        res.status(201).json({ message: "Course updated successfully", course })
    } catch (error) {
        res.status(500).json({ errors: "Error in course updating" })
        console.log("Error in course updating", error);
    }
}

// course deletion
export const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const adminId = req.adminId;  // Admin ID from the middleware

    try {
        // Log for debugging
        console.log("Admin ID:", adminId);
        console.log("Course ID:", courseId);

        // Find and delete the course by courseId and ensure that it's created by the admin
        const course = await Course.findOneAndDelete({
            _id: courseId,
            creatorId: adminId,  // Ensure the admin is the creator of the course
        });

        // Log the course for debugging
        console.log("Course found for deletion:", course);

        // If no course is found, return a 404 error
        if (!course) {
            return res.status(404).json({ error: "Course not found or you are not authorized to delete this course" });
        }

        // Return success response if course is deleted
        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        // Return a 500 error for server issues
        res.status(500).json({ error: "Error in course deletion" });
        console.error("Error in course deleting", error);
    }
};



// All courses
export const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(201).json({ courses })
    } catch (error) {
        res.status(500).json({ errors: "Error in getting courses" })
        console.log("Error to get courses", error);
    }
}

// Targeting particular course
export const courseDetails = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ error: "Course not found " })
        }
        res.status(200).json({ course })
    } catch (error) {
        res.status(500).json({ errors: "Error in getting course details" })
        console.log("Error in course details", error)
    }
}

// buy course
export const buyCourse = async (req, res) => {
    const { userId } = req;
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ errors: "Course not found" });
        }
        const existingPurchase = await Purchase.findOne({ userId, courseId })
        if (existingPurchase) {
            return res.status(400).json({ error: "User has already purchased this course" });
        }

        const newPurchase = new Purchase({ userId, courseId })
        await newPurchase.save();
        res.status(201).json({ message: "Course purchased successfully", newPurchase });
    } catch (error) {
        res.status(500).json({ errors: "Error in course buying" })
        console.log("Error in course buying", error);
    }
}