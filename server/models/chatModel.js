// models/chatModel.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    username: { type: String, default: "Anonymous" },
    message: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "bot", "agent"], // ✅ updated allowed roles
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
