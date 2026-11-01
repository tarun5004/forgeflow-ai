import { Router } from "express";
import { listConversationsController, createConversationController } from "../controller/ai.controller.js";
const router = Router();
router.get("/projects/:projectId/conversations", listConversationsController);
router.post("/projects/:projectId/conversations", createConversationController);
export default router;
