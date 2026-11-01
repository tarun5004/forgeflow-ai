import { Router } from "express";
import { listProjectsController, createProjectController } from "../controllers/project.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"
const projectRouter = Router()
projectRouter.use(authenticate)
projectRouter.get("/", listProjectsController)
projectRouter.post("/", createProjectController)
export default projectRouter
