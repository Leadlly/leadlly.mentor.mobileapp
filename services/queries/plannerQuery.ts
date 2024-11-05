import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from "../axios/axios"; // Ensure this points to your axios instance
import { DataProps } from "@/types/type";


export const useGetPlanner = (id: string) => {
  return useQuery({
    queryKey: ["plannerData", id],
    queryFn: async () => {
      try {
        // API call using axiosClient
        const res: AxiosResponse = await axiosClient.get(
          `/api/student/planner/get/${id}`
        );

        const responseData: DataProps = res.data;
        return responseData;
      } catch (error) {
        console.error("Error fetching planner data");
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching planner data"
          );
        }
      }
    },
  });
};
