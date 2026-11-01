import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";
export function createAuthRouter(): Router {
 const router = Router();
 router.post("/register", register);
 router.post("/login", login);
 return router;
}
