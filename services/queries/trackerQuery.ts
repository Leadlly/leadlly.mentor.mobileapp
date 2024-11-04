import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from '../axios/axios';// Ensure this points to your axios instance

export const getTracker = async (subject: string | string[], id: any) => {
    return useQuery({
        queryKey: ['TrackerData'],
        queryFn: async () => {
            try {
      
              // API call using axiosClient
              const res: AxiosResponse = await axiosClient.get(
                `/api/student/tracker/get/${id}?subject=${subject}`
              );
      
              const responseData = res.data;
              console.log(res._response.data,"this si res")
              return responseData;
            } catch (error) {
              console.error('Error fetching tracker data');
              if (axios.isAxiosError(error)) {
                throw new Error(`${error.response?.data.message}`);
              } else {
                throw new Error('An unknown error occurred while fetching tracker data');
              }
            }
          },
    })
  };
  