import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function adminMiddleware(req, res, next) {
    console.log("🔹 Incoming Headers:", req.headers);

    let token = req.cookies.jwt;  // Check for token in cookies

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    }

    if (!token) {
        console.log("❌ No Token Provided");
        return res.status(401).json({ errors: "No token provided" });
    }

    try {
        // Verify token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);
        req.adminId = decoded.id;  // Save the decoded user info to the request
        next();
    } catch (error) {
        console.error("❌ Invalid or Expired Token", error);
        return res.status(401).json({ errors: "Invalid or expired token" });
    }
}

export default adminMiddleware;
