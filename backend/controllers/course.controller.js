import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.model.js";
import { Purchase } from "../models/purchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import mongoose from "mongoose";

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
    try {
        const { courseID } = req.params; // Extract courseID from URL parameters
        console.log("🟢 Deleting course with ID:", courseID);

        const course = await Course.findById(courseID);
        if (!course) {
            return res.status(404).json({ error: "Course not found!" });
        }

        await Course.findByIdAndDelete(courseID);
        return res.status(200).json({ message: "Course deleted successfully!" });

    } catch (error) {
        console.error("❌ Error deleting course:", error);
        res.status(500).json({ error: "Server error!" });
    }
};




// All courses
export const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({}).sort({ createdAt: -1 }); // 🔥 Sort by newest first
        res.status(200).json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error.stack);
        res.status(500).json({ errors: "Error in getting courses" });
    }
};


// Targeting particular course
export const courseDetails = async (req, res) => {
    const { courseId } = req.params;
    console.log("📌 Received courseId:", courseId);

    // ✅ Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ error: "Invalid course ID format" });
    }

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // ✅ Fetch associated lectures
        const lectures = await Lecture.find({ courseId });

        // Ensure title is returned in the response
        res.status(200).json({
            title: course.title,
            description: course.description,
            price: course.price,
            image: course.image,
            creatorId: course.creatorId,
            lectures,
        });
    } catch (error) {
        console.error("❌ Error fetching course details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// buy course
// export const buyCourse = async (req, res) => {
//     try {
//         const { userId } = req; // Check if this is correctly populated
//         const { courseId } = req.params;

//         if (!userId) {
//             return res.status(400).json({ error: "User ID is required" });
//         }

//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ error: "Course not found" });
//         }

//         // Check if the user has already purchased the course
//         const existingPurchase = await Purchase.findOne({ userId, courseId });
//         if (existingPurchase) {
//             return res.status(400).json({ error: "User has already purchased this course" });
//         }

//         // Save the purchase
//         const newPurchase = new Purchase({ userId, courseId });
//         await newPurchase.save();

//         return res.status(201).json({ message: "Course purchased successfully", newPurchase });
//     } catch (error) {
//         console.error("Error in course buying:", error);
//         return res.status(500).json({ error: "Error in course buying" });
//     }
// };
export const purchaseCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({ error: "User ID and Course ID are required" });
        }

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Check if user already purchased the course
        const existingPurchase = await Purchase.findOne({ userId, courseId });
        if (existingPurchase) {
            return res.status(400).json({ error: "Course already purchased" });
        }

        // Create a new purchase entry
        const purchase = new Purchase({ userId, courseId });
        await purchase.save();

        // Update user's purchased courses
        await User.findByIdAndUpdate(userId, { $push: { purchasedCourses: purchase._id } });

        res.json({ message: "Purchase successful!", purchase });
    } catch (error) {
        console.error("Error purchasing course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Fetch purchased courses for the logged-in user
export const getPurchasedCourses = async (req, res) => {
    const userId = req.userId; // Extract userId from middleware (Ensure it's set correctly)

    console.log("📌 User ID:", userId);

    if (!userId) {
        return res.status(400).json({ error: "User ID is missing from request" });
    }

    try {
        // Fetch purchases and populate course details
        const purchases = await Purchase.find({ userId }).populate("courseId");

        if (!purchases.length) {
            return res.status(200).json({ message: "No purchased courses found", courses: [] });
        }

        // Extract purchased courses
        const purchasedCourses = purchases.map(purchase => purchase.courseId);
        res.status(200).json({ purchasedCourses });
    } catch (error) {
        console.error("❌ Error fetching purchased courses:", error);
        res.status(500).json({ errors: "Error in getting course details" });
    }
};





