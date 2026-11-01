import type { NextFunction, Request, Response } from "express"
import { AppError } from "../middlewares/error.middleware.js"
import { Project } from "../models/project.model.js"



export async function listProjectsController(req: Request, res: Response, next: NextFunction) {
    try {
        const projects = await Project.find({ user: req.user!.id })
            .sort({ createdAt: -1 })
            .lean()

        res.status(200).json({ projects })
    } catch (error) {
        next(error)
    }
}
