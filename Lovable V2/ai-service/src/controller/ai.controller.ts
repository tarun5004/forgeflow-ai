import { ConversationModel } from "../models/conversation.model.js";
import { ProjectModel } from "../models/project.model.js";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/error.middleware.js";
import { MessageModel } from "../models/message.model.js";



/** Resolves the ai-service project record the caller is allowed to use. */
async function requireProject(userId: string, projectId: unknown) {
    if (typeof projectId !== "string" || !projectId.trim()) {
        throw new AppError(400, "projectId is required");
    }

    const project = await ProjectModel.findOne({ projectId, userId }).catch(() => null);

    if (!project) {
        throw new AppError(404, "Project not found");
    }

    return project;
}


/** Resolves a conversation the caller owns. */
async function requireConversation(userId: string, conversationId: string) {
    const conversation = await ConversationModel.findById(conversationId).catch(() => null);

    if (!conversation || conversation.user?.toString() !== userId) {
        throw new AppError(404, "Conversation not found");
    }

    return conversation;
}


/**
 * GET /api/ai/projects/:projectId/conversations
 */
export async function listConversationsController(req: Request, res: Response, next: NextFunction) {
    try {
        const project = await requireProject(req.user!.id, req.params.projectId);

        const conversations = await ConversationModel.find({
            project: project.id,
            user: req.user!.id
        }).sort({ updatedAt: -1 });

        res.json({
            conversations: conversations.map(conversation => ({
                _id: conversation.id,
                title: conversation.title,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt
            }))
        });
    } catch (error) {
        next(error);
    }
}


/**
 * POST /api/ai/projects/:projectId/conversations
 * req.body = { title?: string }
 */
export async function createConversationController(req: Request, res: Response, next: NextFunction) {
    try {
        const project = await requireProject(req.user!.id, req.params.projectId);
        const title = typeof req.body?.title === "string" ? req.body.title.trim() : "";

        const conversation = await ConversationModel.create({
            title: title || "New conversation",
            project: project.id,
            user: req.user!.id
        });

        res.status(201).json({
            conversation: {
                _id: conversation.id,
                title: conversation.title,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
}


/**
 * GET /api/ai/conversations/:conversationId/messages
 *
 * Only user prompts and assistant prose are returned; tool calls and tool
 * results are internal agent bookkeeping and never reach the client.
 */
export async function listMessagesController(req: Request, res: Response, next: NextFunction) {
    try {
        const conversation = await requireConversation(req.user!.id, String(req.params.conversationId));

        const messages = await MessageModel.find({
            conversationId: conversation.id,
            author: { $in: ["user", "ai"] }
        }).sort({ createdAt: 1 });

        res.json({
            conversation: { _id: conversation.id, title: conversation.title },
            messages: messages
                .filter(message => (message.content || "").trim().length > 0)
                .map(message => ({
                    _id: message.id,
                    author: message.author,
                    content: message.content || "",
                    createdAt: message.createdAt
                }))
        });
    } catch (error) {
        next(error);
    }
}
