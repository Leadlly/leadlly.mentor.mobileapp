import React, { useRef } from "react";
import { View, ActivityIndicator, Text,StyleSheet } from "react-native";
import Tracker from "@/components/trackerComponents/Tracker";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";
import { useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { StudentDataProps } from "@/types/type";

const Trackerpage = () => {
  // Since we're in student/[studentId]/tracker.tsx, we use the same parameter name
  const params = useLocalSearchParams();
  const studentId = params.studentId; // This matches your folder structure [studentId]
  
  console.log("Raw params:", params);
  console.log("StudentId from params:", studentId);
  
  const loading_animation = useRef<LottieView>(null);
  
  const _id = Array.isArray(studentId) ? studentId[0] : studentId;
  
  console.log("Processed _id:", _id);
  
  const { data, isError, isLoading, error } = useGetAllocatedStudents(_id);
  console.log('this is data', data)

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white min-h-screen flex">
        <LottieView
          ref={loading_animation}
          source={require("../../../assets/dashboard_loading.json")} 
          autoPlay
          loop={true}
          style={{
            width: "100%",
            height: "10%",
          }}
        />
        <Text className="text-lg font-mada-medium text-gray-600 mt-4">
          Loading student data...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">
          {error?.message || "An error occurred while fetching student data"}
        </Text>
      </View>
    );
  }

  const studentinfo: StudentDataProps = data.student;
  console.log(studentinfo.academic.subjects,"subjects")

  if (!studentinfo) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">
          No student found with ID: {_id}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Tracker
        studentId={_id}
        studentSubjects={studentinfo.academic.subjects}
      />
    </View>
  );
};

export default Trackerpage;

const styles = StyleSheet.create({

});
