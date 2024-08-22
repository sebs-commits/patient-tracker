import axios from "axios";

// Register a new user
export const registerUser = async (userData) => {
  const response = await axios.post("/api/auth/register", userData);
  return response.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const response = await axios.post("/api/auth/login", credentials);
  return response.data;
};
