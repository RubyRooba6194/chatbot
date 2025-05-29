// server.js
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import socketHandler from "./socket/socketHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server running!" });
});

// Routes
app.use("/api", chatRoutes(io));

// Initialize Socket.IO handlers
socketHandler(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO ready`);
});

export { io }; // Optional: For testing or future use
