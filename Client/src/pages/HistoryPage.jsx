import React, { useState, useEffect } from "react";
import { getChatHistory, deleteChatSession } from "../services/api";

const HistoryPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const sessionId = localStorage.getItem("chatSessionId");

  useEffect(() => {
    if (sessionId) {
      loadChatHistory();
    }
  }, [sessionId]);

  const loadChatHistory = async () => {
    setLoading(true);
    try {
      const history = await getChatHistory(sessionId);
      setMessages(history);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      try {
        await deleteChatSession(sessionId);
        setMessages([]);
        localStorage.removeItem("chatSessionId");
        window.location.reload();
      } catch (error) {
        console.error("Failed to clear history:", error);
      }
    }
  };

  if (!sessionId) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Chat History</h2>
        <p className="text-gray-500">No active session. Start a chat first!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Chat History</h2>
        <div className="space-x-2">
          <button
            onClick={loadChatHistory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={handleClearHistory}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            disabled={messages.length === 0}
          >
            Clear History
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No chat history available</p>
          <p className="text-sm mt-2">
            Start a conversation to see your history here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold mb-4">Session ID: {sessionId}</h3>
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    msg.role === "user"
                      ? "bg-green-100 ml-8"
                      : msg.role === "bot"
                      ? "bg-gray-100 mr-8"
                      : "bg-yellow-100 mr-8"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1 capitalize">
                    {msg.role}
                  </div>
                  <div>{msg.message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
