import { authenticate } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { register, login, me } from "../controller/auth.controller.js";
export function createAuthRouter(): Router {
 const router = Router();
 router.post("/register", register);
 router.post("/login", login);
 router.get("/me", authenticate, me);
 return router;
}
