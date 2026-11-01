import type { NextFunction, Request, Response } from "express";
import { HttpError, parseFilenamesQuery } from "../utils/path.util.js";
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

export async function getFiles(req: Request, res: Response, next: NextFunction) {
    try {
        const filenames = parseFilenamesQuery(req.query.filenames);
        const files = await fileService.readFiles(filenames)
        res.json({
            success: true,
            message: "Files read successfully",
            files
        });
    } catch (error) {
        next(error);
    }
}

