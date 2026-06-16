import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body);

  res.cookie("accessToken", result.token, cookieOptions);

  res.status(201).json({
    user: result.user,
  });
}

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);

  res.cookie("accessToken", result.token, cookieOptions);

  res.json({
    user: result.user,
  });
}

export function me(req: Request, res: Response) {
  return res.json({
    user: req.user,
  });
}