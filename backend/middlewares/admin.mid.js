import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  // Import dotenv to load environment variables

dotenv.config();  // Load environment variables from .env file

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ errors: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        // Use the JWT secret from the environment variable
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ errors: "Invalid token or expired token" });
        console.log("Invalid token or expired token", error);
    }
}

export default adminMiddleware;
