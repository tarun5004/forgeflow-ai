import { Router } from "express";
import { register } from "../controller/auth.controller.js";
export function createAuthRouter(): Router {
 const router = Router();
 router.post("/register", register);
 return router;
}
