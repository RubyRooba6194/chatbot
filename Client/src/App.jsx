import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;