import { ChatMessage } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useGetChatMessages = (data: {
  mentorId: string | undefined;
  studentId: string | undefined;
}) => {
  return useQuery({
    queryKey: ["chat_messages"],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{ messages: ChatMessage[] }> =
          await axios.post(
            `${process.env.EXPO_PUBLIC_CHAT_API_BASE_URL}/api/chat/get`,
            data
          );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chat messages!!");
        }
      }
    },
  });
};

export const useGetUnreadNotifications = (data: {
  receiver: string | undefined;
  room: string | undefined;
}) => {
  return useQuery({
    queryKey: ["chat_notifications"],
    queryFn: async () => {
      try {
        const res: AxiosResponse<{
          success: boolean;
          unreadCount: { messageCount: number; room: string }[];
        }> = await axios.post(
          `${process.env.EXPO_PUBLIC_CHAT_API_BASE_URL}/api/notification/unread`,
          data
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error while fetching unread notifications!!"
          );
        }
      }
    },
  });
};
