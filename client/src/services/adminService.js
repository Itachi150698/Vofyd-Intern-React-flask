// services/adminService.js

import axiosInstance from "../api/axiosInstance";

const adminService = {
  // Add Admin User
  addUser: async (userData) => {
    const response = await axiosInstance.post("/admin/add_user", userData);
    return response.data;
  },

  // List Admin Users
  listUsers: async () => {
    const response = await axiosInstance.get("/admin/list_users");
    return response.data;
  },

  // Update Admin User
  updateUser: async (userId, userData) => {
    const response = await axiosInstance.put(`/admin/update_user/${userId}`, userData);
    return response.data;
  },

  // Delete Admin User
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/admin/delete_user/${userId}`);
    return response.data;
  },

  // View Super Admin Details
  viewSuperAdmin: async () => {
    const response = await axiosInstance.get("/admin/super_admin");
    return response.data;
  },
};

export default adminService;
