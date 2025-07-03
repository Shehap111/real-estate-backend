import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ هنا بنتأكد إن الإيميل موجود فعلًا في الداتا بيز
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) {
      return res.status(403).json({ message: "Forbidden. Not an admin." });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
