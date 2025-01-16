import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}
export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const token = (req as AuthRequest).header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthRequest).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  }