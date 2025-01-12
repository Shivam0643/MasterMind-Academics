import { Admin } from "../models/admin.model.js";
import config from "../config.js";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const adminSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be atleast 3 char long" }),
        lastName: z.string().min(3, { message: "Last name must be atleast 3 char long" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "password must be atleast 6 char long" }),
    })

    const validateData = adminSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map(err => err.message) })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(409).json({ errors: "Admin already exists" })
        }

        const newAdmin = new Admin({ firstName, lastName, email, password: hashPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Signup successfully", newAdmin })
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" })
        console.log("Error in signup", error);
    }
}

// Signin
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!admin || !isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid credentials" })
        }

        // jwt code 
        const token = jwt.sign({
            id: admin._id,
        }, config.JWT_ADMIN_PASSWORD,
            { expiresIn: "1d" });

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //1/day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSites: "Strict" //prevent from CSRF attack
        }
        res.cookie("jwt", token, cookieOptions);


        res.status(201).json({ message: "Login successfully", admin, token });
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error);
    }
}

// logout
export const logout = async (req, res) => {
    try {
        if (!req.cookies.jwt){
            return res.status(401).json({errors:"Kindly login first"})
        }
            res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in logout" });
        console.log("Error in logout", error);
    }
}