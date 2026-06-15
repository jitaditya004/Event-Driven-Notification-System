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
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = header.split(" ")[1];

  const payload = verifyToken(token);

  req.user = {
    id: payload.userId,
  };

  next();
}
