import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios/axios";
import axios from "axios";
import { ChapterTopicsProps, SubjectChaptersProps } from "../../types/types";

export const useGetSubjectChapters = (
  subject: string | string[],
  standard: number
) => {
  return useQuery({
    queryKey: ["chapters"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`
        );

        const responseData: {
          chapters: SubjectChaptersProps[];
          success: boolean;
        } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapters!!");
        }
      }
    },
  });
};

export const useGetChapterTopics = (
  subject: string | string[],
  chapterName: string,
  standard: number
) => {
  return useQuery({
    queryKey: ["topics", chapterName],
    queryFn: async () => {
      try {
        const res = await axiosClient.get(
          `/api/questionbank/topic?subjectName=${subject}&chapterName=${chapterName}&standard=${standard}`
        );

        const responseData: {
          topics: ChapterTopicsProps[];
          success: boolean;
        } = res.data;

        return responseData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.response?.data.message}`);
        } else {
          throw new Error("An unknown error while fetching chapter topics!!");
        }
      }
    },
    enabled: !!chapterName,
  });
};
