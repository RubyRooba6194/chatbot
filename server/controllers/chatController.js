// controllers/chatController.js
import Chat from "../models/chatModel.js";

// Get chat history for a specific session
export const getChatHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const chats = await Chat.find({ sessionId }).sort({ createdAt: 1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Get all chat logs (admin view)
export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching all chats:", error);
    res.status(500).json({ error: "Failed to fetch all chat messages" });
  }
};

// Save a new message and emit via WebSocket
export const postMessage = async (req, res, io) => {
  const {
    sessionId,
    message,
    role = "user",
    username = "Anonymous",
  } = req.body;

  if (!sessionId || !message) {
    return res
      .status(400)
      .json({ error: "sessionId and message are required" });
  }

  try {
    const newChat = new Chat({
      sessionId,
      message,
      role,
      username,
    });

    await newChat.save();

    // Emit message to client via WebSocket (if io is available)
    if (io) {
      io.to(sessionId).emit("receiveMessage", {
        sender: role,
        text: message,
      });
    }

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ error: "Failed to post message" });
  }
};

// Delete all messages in a session
export const deleteChatSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    await Chat.deleteMany({ sessionId });
    res.status(200).json({ message: `Chat session '${sessionId}' deleted.` });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Failed to delete chat session" });
  }
};
