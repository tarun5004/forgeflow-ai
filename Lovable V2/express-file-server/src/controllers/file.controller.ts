import type { NextFunction, Request, Response } from "express";
import * as fileService from "../service/file.service.js";

export async function getFileTree(_req: Request, res: Response, next: NextFunction) {
    try {
        const tree = await fileService.getFileTree();
        res.status(200).json({
            success: true,
            message: "File tree retrieved successfully",
            tree: tree.join("\n")
        });
    } catch (error) {
        next(error);
    }
}

