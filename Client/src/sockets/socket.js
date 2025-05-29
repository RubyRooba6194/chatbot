// src/sockets/socket.js 
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  reconnectionAttempts: 10,
  timeout: 20000,
  transports: ["polling", "websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Connected to server on port 3000:", socket.id); // 👈 Updated message
  console.log("🔗 Transport:", socket.io.engine.transport.name);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected from server:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🚫 Connection error:", error.message);
  console.error("Error details:", error);
  console.log("🔍 Attempting to connect to: http://localhost:3000"); // 👈 Updated message
  console.log(
    "🔍 Current transport:",
    socket.io.engine?.transport?.name || "none"
  );
});

socket.on("reconnect", (attemptNumber) => {
  console.log("🔄 Reconnected to port 000 after", attemptNumber, "attempts");
});

export default socket;
