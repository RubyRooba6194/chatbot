import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// ✅ Save a new chat message to the server
export const saveMessage = async ({ sessionId, message, role }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chats`, {
      sessionId,
      message,
      role, // ✅ dynamically passed role
    });
    return response.data;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

// ✅ Fetch chat history for a session
export const getChatHistory = async (sessionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chats/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return []; // fallback
  }
};

// ✅ Delete a chat session
export const deleteChatSession = async (sessionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/chats/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting chat session:", error);
    throw error;
  }
};
