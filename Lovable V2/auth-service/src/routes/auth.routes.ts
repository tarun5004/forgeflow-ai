import { authenticate } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { register, login, me, refresh } from "../controller/auth.controller.js";
export function createAuthRouter(): Router {
 const router = Router();
 router.post("/register", register);
 router.post("/login", login);
 router.post("/refresh", refresh);
 router.get("/me", authenticate, me);
 return router;
}
