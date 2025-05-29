// ChatBox.jsx
import React, { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = ({ messages, onSend }) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="border rounded-lg p-4 h-[500px] flex flex-col bg-white shadow-sm">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 flex flex-col">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Start a conversation...
          </div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble key={i} sender={msg.sender} text={msg.text} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={!text.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
