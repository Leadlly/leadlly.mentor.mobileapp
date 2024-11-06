import { useLocalSearchParams } from "expo-router";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";
import { StudentDataProps } from "@/types/type";
export const useStudentData = () => {
  const { studentId } = useLocalSearchParams();
  const _id = Array.isArray(studentId) ? studentId[0] : studentId;

  const { data, isError, isSuccess, error, isLoading } =
    useGetAllocatedStudents(_id);

  const student: StudentDataProps = data?.student;

  return {
    student,
    isError,
    isSuccess,
    error,
    isLoading,
  };
};
