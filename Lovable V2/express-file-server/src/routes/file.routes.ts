import { Router } from "express";
import { getFileTree } from "../controllers/file.controller.js";

const router: Router = Router();
router.get("/file-tree", getFileTree);
export default router;
