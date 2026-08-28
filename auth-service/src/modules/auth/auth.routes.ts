import { Router } from "express";
import { login, register, me, logout } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, me);

router.post("/logout",logout)

export default router;
