import jwt from 'jsonwebtoken';
import config from '../config.js';

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.error("❌ No token provided");
        return res.status(401).json({ errors: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        req.userId = decoded.id;
        console.log("✅ Middleware extracted userId:", req.userId);  // ✅ Debugging
        next();
    } catch (error) {
        console.error("❌ Invalid or expired token", error);
        return res.status(401).json({ errors: "Invalid or expired token" });
    }
}


export default userMiddleware;