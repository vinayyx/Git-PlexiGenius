import jwt from "jsonwebtoken";

// Middleware reads Access Token from Authorization header: "Bearer <token>"
export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Authorization header missing" });

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Invalid authorization format" });

    const token = parts[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch (err) {
    console.error("auth middleware err:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// optional role based middleware factory
export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};
