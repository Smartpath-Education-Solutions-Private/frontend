import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: number;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;