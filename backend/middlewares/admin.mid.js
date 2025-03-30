import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function adminMiddleware(req, res, next) {
    console.log("🔹 Incoming Headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No Token Provided");
        return res.status(401).json({ errors: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        console.error("❌ Invalid or Expired Token", error);
        res.status(401).json({ errors: "Invalid token or expired token" });
    }
}


export default adminMiddleware;
