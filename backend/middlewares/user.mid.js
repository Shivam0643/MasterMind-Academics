import jwt from 'jsonwebtoken';
import config from '../config.js';

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        req.userId = null;
        return next(); // ✅ Proceed even if no token
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        req.userId = decoded.id;
        console.log("✅ Middleware extracted userId:", req.userId);
    } catch (error) {
        console.warn("⚠️ Invalid or expired token. Continuing as guest.");
        req.userId = null;
    }

    next();
}

export default userMiddleware;
