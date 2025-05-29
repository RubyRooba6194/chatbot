// routes/chatRoutes.js
import express from "express";
import {
  getAllChats,
  getChatHistory,
  postMessage,
  deleteChatSession,
} from "../controllers/chatController.js";

const router = express.Router();

export default (io) => {
  // Get all chat messages (optional, for admin or debugging)
  router.get("/chats", getAllChats);

  // Get chat history by sessionId
  router.get("/chats/:sessionId", getChatHistory);

  // Save a new message and broadcast it using socket.io
  router.post("/chats", (req, res) => postMessage(req, res, io));

  // Delete all messages in a session
  router.delete("/chats/:sessionId", deleteChatSession);

  return router;
};
