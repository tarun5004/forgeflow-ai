import { Router } from "express";
import { getFileTree, getFiles } from "../controllers/file.controller.js";

const router: Router = Router();
router.get("/file-tree", getFileTree);
router.get("/files", getFiles);
export default router;
