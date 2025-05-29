// const MessageBubble = ({ sender, text }) => {
//   const isUser = sender === "user";
//   const isBot = sender === "bot";
//   const isAgent = sender === "agent";

//   const bubbleStyle = isUser
//     ? "bg-green-100 self-end"
//     : isBot
//     ? "bg-gray-200 self-start"
//     : "bg-yellow-100 self-start";

//   return <div className={`p-2 rounded max-w-xs ${bubbleStyle}`}>{text}</div>;
// };

// export default MessageBubble;
import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  const isBot = sender === "bot";
  const isAgent = sender === "agent";

  const bubbleStyle = isUser
    ? "bg-green-100 self-end text-right"
    : isBot
    ? "bg-gray-200 self-start"
    : "bg-yellow-100 self-start";

  return (
    <div className={`p-3 rounded-lg max-w-xs mb-2 ${bubbleStyle}`}>
      <div className="text-xs text-gray-500 mb-1 capitalize">{sender}</div>
      <div>{text}</div>
    </div>
  );
};

export default MessageBubble;