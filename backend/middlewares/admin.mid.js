import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const adminMiddleware = (req, res, next) => {
  let token = null;

  // ✅ First: Try to get token from Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ✅ Second: Try to get token from cookies if not in header
  if (!token && req.cookies?.jwt) {
    token = req.cookies.jwt;
  }


  if (!token) {
    console.log("⛔ No token provided");
    return res.status(401).json({ errors: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);
    console.log("✅ Token verified:", decoded);

    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
};

export default adminMiddleware;
