// socket/socketHandler.js
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ New client connected:", socket.id);

    // Handle session joining
    socket.on("joinSession", (sessionId) => {
      if (sessionId) {
        socket.join(sessionId);

        console.log(socket.sessionId);
        socket.data.sessionId = sessionId;
        console.log(`👤 Client ${socket.id} joined session: ${sessionId}`);
      } else {
        console.warn(`⚠️ No sessionId provided by client ${socket.id}`);
      }
    });

    // Handle incoming user messages
    socket.on("userMessage", ({ sessionId, message }) => {
      if (sessionId && message) {
        console.log(`💬 Message from session ${sessionId}: ${message}`);

        // Here you can implement chatbot/agent reply logic
        // For now, just echoing as a bot reply
        io.to(socket.id).emit("botReply", `Bot: You said "${message}"`);
      } else {
        console.warn(`⚠️ Invalid userMessage from ${socket.id}`);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

export default socketHandler;
