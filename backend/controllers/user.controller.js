import { User } from "../models/user.model.js";
import config from "../config.js";
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3, { message: "First name must be atleast 3 char long" }),
        lastName: z.string().min(3, { message: "Last name must be atleast 3 char long" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "password must be atleast 6 char long" }),
    })

    const validateData = userSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map(err => err.message) })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ errors: "User already exists" })
        }

        const newUser = new User({ firstName, lastName, email, password: hashPassword });
        await newUser.save();
        res.status(201).json({ message: "Signup successfully", newUser })
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" })
        console.log("Error in signup", error);
    }
}

// Signin
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid credentials" })
        }

        // jwt code 
        const token = jwt.sign({
            id: user._id,
        }, config.JWT_USER_PASSWORD);
        res.cookie("jwt", token);


        res.status(201).json({ message: "Login successfully", user, token });
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error);
    }
}

// logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in logout" });
        console.log("Error in logout", error);
    }
}