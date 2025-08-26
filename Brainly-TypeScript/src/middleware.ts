import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const JWT_SECRET = "ANKIT123";

// Extend Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.id; // or decodedToken.userId based on your jwt.sign
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
};

export default userMiddleware;
