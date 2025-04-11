import jwt from 'jsonwebtoken';
import config from '../config.js';

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.warn("⚠️ No Bearer token found. Treating as guest.");
        req.userId = null;
        return next(); // Proceed as guest
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        req.userId = decoded.id;
        console.log("✅ User token verified. userId:", req.userId);
    } catch (error) {
        console.warn("⚠️ Invalid or expired user token. Proceeding as guest.");
        req.userId = null;
    }

    next();
}

export default userMiddleware;
