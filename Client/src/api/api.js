import axios from "axios";

const API_BASE_URL = "http://localhost:000/api"; // Base URL for backend REST API

export const saveMessage = async (sessionId, message) => {
  const response = await axios.post(`${API_BASE_URL}/chats`, {
    sessionId,
    ...message,
  });
  return response.data;
};

// Add other functions like getChatHistory, deleteChatSession, etc.
export const getChatHistory = async (sessionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chats/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
};

export const deleteChatSession = async (sessionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/chats/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting chat session:", error);
    throw error;
  }
};
