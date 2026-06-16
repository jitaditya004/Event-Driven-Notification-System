import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  req.user = {
    id: payload.userId,
  };

  next();
}
