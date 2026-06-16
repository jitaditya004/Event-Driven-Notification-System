import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwt";

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

  const payload = verifyToken(token);

  req.user = {
    id: payload.userId,
  };

  next();
}
