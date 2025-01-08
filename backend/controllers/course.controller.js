import { Course } from "../models/course.model.js";
export const createCourse = async (req, res) => {
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
