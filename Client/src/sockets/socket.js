// src/sockets/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("✅ Connected to server on port 3000:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected from server:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🚫 Connection error:", error.message);
  console.error("Error details:", error);
  console.log("🔍 Attempting to connect to: http://localhost:3000"); // 👈 Updated message
});

export default socket;
