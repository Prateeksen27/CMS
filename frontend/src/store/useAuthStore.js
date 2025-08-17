import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username, password, role) => {
        try {
          console.log(role);
          
          const response = await axiosInstance.post("/auth/login", {
            username,
            password,
            role,
          });
          set({ user: response.data.user, isAuthenticated: true });
          toast.success(`Welcome to CMS, ${response.data.user.username}!`);
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Login failed");
        }
      },

      logout: () => {
        try {
          set({ user: null, isAuthenticated: false });
          toast.success("Logout successful");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Logout failed");
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
