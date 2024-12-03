import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

interface SendNotificationPayload {
  studentIds: string[];
  message: string;
  urls: string[];
}

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SendNotificationPayload) => {
      const response = await axiosClient.post("/api/notification/send", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to send notification: ${error.response?.data.message || error.message}`);
      } else {
        throw new Error("An unknown error occurred while sending notification");
      }
    },
  });
};

