import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "../axios/axios";

export const useGetWeeklyReport = (id: string) => {
  return useQuery({
    queryKey: ["weeklyReport", id],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/student/report/week?studentId=${id}`
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching weekly report!"
          );
        }
      }
    },
  });
};

export const useGetMonthlyReport = (id: string) => {
  return useQuery({
    queryKey: ["monthlyReport", id],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/student/report/month?studentId=${id}`
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching monthly report!"
          );
        }
      }
    },
  });
};

export const useGetOverallReport = (id: string) => {
  return useQuery({
    queryKey: ["overallReport", id],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/student/report/overall?studentId=${id}`
        );
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching overall report!"
          );
        }
      }
    },
  });
};
