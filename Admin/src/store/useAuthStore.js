import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (username, password, role) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
      role
    });
    
    toast.success(`Welcome to CMS, ${response.data.user.username}!`);
    set({ user: response.data.user, isAuthenticated: true });

    // Or shorter: toast.success("Successfully logged in! Welcome to CMS");

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Login failed");
  }
},


  logout: async () => {
    try {
     
      set({ user: null, isAuthenticated: false });
      toast.success("Logout successful");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
