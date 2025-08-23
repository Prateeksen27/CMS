import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const clientAuthStore = create((set) => ({
        estimatedPrice: 0,
        setEstimatedPrice: (price) => set({ estimatedPrice: price }),
      sendQuery: async ({name,email,message}) => {
        try {
            const response = await axiosInstance.post("/client/sendQuery", {
            name,
            email,
            message
          });
          toast.success("Query Sent Successfully");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Error Sending Query! Try Again");
        }
      },
    }),
  )
