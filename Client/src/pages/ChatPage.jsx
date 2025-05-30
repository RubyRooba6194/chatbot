import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import socket from "../sockets/socket";
import { saveMessage, getChatHistory } from "../services/api";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem("chatSessionId");
    if (stored) return stored;
    const newId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    localStorage.setItem("chatSessionId", newId);
    return newId;
  });

  useEffect(() => {
    loadChatHistory();

    socket.on("connect", () => {
      setConnectionStatus("connected");
    });

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    socket.on("botReply", async (msg) => {
      const botMessage = { sender: "bot", text: msg };
      setMessages((prev) => [...prev, botMessage]);

      try {
        await saveMessage({ sessionId, message: msg, role: "bot" });
      } catch (error) {
        console.error("Failed to save bot message:", error);
      }
    });

    socket.on("agentReply", async (msg) => {
      const agentMessage = { sender: "agent", text: msg };
      setMessages((prev) => [...prev, agentMessage]);

      try {
        await saveMessage({ sessionId, message: msg, role: "agent" });
      } catch (error) {
        console.error("Failed to save agent message:", error);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("botReply");
      socket.off("agentReply");
    };
  }, [sessionId]);

  const loadChatHistory = async () => {
    try {
      const history = await getChatHistory(sessionId);
      const formattedMessages = history.map((chat) => ({
        sender: chat.role,
        text: chat.message,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const handleSendMessage = async (text) => {
    const message = { sender: "user", text };
    console.log("Sending message:", message);
    setMessages((prev) => [...prev, message]);

    try {
      await saveMessage({ sessionId, message: text, role: "user" });
    } catch (error) {
      console.error("Failed to save message:", error);
    }

    socket.emit("userMessage", { message: text, sessionId });
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-600";
      case "disconnected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Chat</h2>
        <div className={`text-sm ${getStatusColor()}`}>
          Status: {connectionStatus}
        </div>
      </div>

      {connectionStatus === "disconnected" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Connection lost. Please check if the server is running and refresh the
          page.
        </div>
      )}

      <ChatBox messages={messages} onSend={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
