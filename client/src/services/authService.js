// src/services/authService.js
import axiosInstance from "../api/axiosInstance";


export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};
