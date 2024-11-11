import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import axiosClient from '../axios/axios'; 

export const getTracker = (subject: string | string[], id: any) => {
    return useQuery({
        queryKey: ['TrackerData', id, subject], 
        queryFn: async () => {
            try {
                // API call using axiosClient
                const res: AxiosResponse = await axiosClient.get(
                    `/api/student/tracker/get/${id}?subject=${subject}`
                );

                return res.data;
            } catch (error) {
                console.error('Error fetching tracker data');
                if (axios.isAxiosError(error)) {
                    throw new Error(error.response?.data.message || 'An error occurred');
                } else {
                    throw new Error('An unknown error occurred while fetching tracker data');
                }
            }
        },
        staleTime: 0,
        refetchOnWindowFocus: true, 
    });
};
