import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../axios/axios";

export const useGetMeetings = (studentId: string, meeting?: string, createdBy?: string, allMeetings?: string) => {
  return useQuery({
    queryKey: ["meetingsData", studentId],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams({ studentId });
        if (meeting) queryParams.append("meeting", meeting);
        if (createdBy) queryParams.append("createdBy", createdBy);
        if (allMeetings) queryParams.append("allMeetings", allMeetings);
        if (!meeting && !createdBy) queryParams.append("allMeetings", "true");

        const res = await axiosClient.get(
          `/api/meeting/get?${queryParams.toString()}`
        );

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error occurred while fetching meetings data");
        }
      }
    },
  });
};

export const useAcceptMeeting = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meetingId: string) => {
      const res: AxiosResponse = await axiosClient.put(`/api/meeting/accept/${meetingId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingsData"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.response?.data.message}`);
      } else {
        throw new Error("An unknown error occurred while accepting meeting");
      }
    },
  });
};

export const useRescheduleMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ meetingId, data }: { meetingId: string; data: { date: Date; time: string } }) => {
      const res: AxiosResponse = await axiosClient.put(`/api/meeting/reschedule/${meetingId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingsData"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.response?.data.message}`);
      } else {
        throw new Error("An unknown error occurred while rescheduling meeting");
      }
    },
  });
};

export const useScheduleMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      date: Date;
      time: string;
      studentIds: string[] | undefined;
      message?: string;
    }) => {
      const res: AxiosResponse = await axiosClient.put("/api/meeting/schedule", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["meetingsData"] });
      variables.studentIds?.forEach(studentId => {
        queryClient.invalidateQueries({ queryKey: ["meetingsData", studentId] });
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.response?.data.message}`);
      } else {
        throw new Error("An unknown error occurred while scheduling meeting");
      }
    },
  });
};
