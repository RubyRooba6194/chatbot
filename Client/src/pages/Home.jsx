import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-20 px-4">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        Welcome to SupportEase
      </h2>
      <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
        Need help? Start chatting with our intelligent assistant or connect with
        a support agent for personalized assistance.
      </p>
      <div className="space-x-4">
        <Link
          to="/chat"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
        >
          Start Chat
        </Link>
        <Link
          to="/history"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
        >
          View History
        </Link>
      </div>
    </div>
  );
};

export default Home;