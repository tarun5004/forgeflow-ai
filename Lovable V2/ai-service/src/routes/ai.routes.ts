import { Router } from "express";
import { listConversationsController, createConversationController, listMessagesController } from "../controller/ai.controller.js";
const router = Router();
router.get("/projects/:projectId/conversations", listConversationsController);
router.post("/projects/:projectId/conversations", createConversationController);
router.get("/conversations/:conversationId/messages", listMessagesController);
export default router;
