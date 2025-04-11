import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Admin} from '../models/admin.model.js'; // import your Admin model

dotenv.config();

async function adminMiddleware(req, res, next) {
    console.log("🔹 Incoming Headers:", req.headers);

    let token = req.cookies.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        console.log("❌ No Token Provided");
        return res.status(401).json({ errors: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        const admin = await Admin.findById(decoded.id).select("-password"); // exclude password

        if (!admin) {
            return res.status(404).json({ errors: "Admin not found" });
        }

        req.admin = admin; // attach full admin object
        next();
    } catch (error) {
        console.error("❌ Invalid or Expired Token", error);
        return res.status(401).json({ errors: "Invalid or expired token" });
    }
}

export default adminMiddleware;
