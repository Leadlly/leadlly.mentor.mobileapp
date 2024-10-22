import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from '../axios/axios';// Ensure this points to your axios instance

export const useGetPlanner = (id?: string) => {
  return useQuery({
    queryKey: ['planner', id],
    queryFn: async () => {
      try {
        let plannerId = '';
        if (id) plannerId = id;

        // API call using axiosClient
        const res: AxiosResponse = await axiosClient.get(
          `/api/student/planner/get/${plannerId}`
        );

        const responseData = res.data;
        return responseData;
      } catch (error) {
        console.error('Error fetching planner data');
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error('An unknown error occurred while fetching planner data');
        }
      }
    },
    enabled: !!id, // Ensures query only runs if id is provided
    retry: 2, // Retry twice if the query fails
  });
};
