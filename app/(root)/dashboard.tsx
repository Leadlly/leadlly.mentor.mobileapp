import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";
import StudentCard from "@/components/dashboardComponents/StudentCard";
import FilterModal from "@/components/dashboardComponents/FilterModal";
import Feather from "@expo/vector-icons/Feather";
import StudentCardLoader from "@/components/LoadingComponents/StudentCardLoader";
import NoDataFoundLottie from "@/components/shared/NoDataFoundLottie";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");

  const { data, isError, isLoading } = useGetAllocatedStudents();
  const [loading, setLoading] = useState(false);
  console.log(data)

  // const [students, setStudents] = useState<StudentDataProps[]>([]);
  // useEffect(() => {
  //   setLoading(true);
  //   if (isSuccess && data?.students) {
      // setStudents(data.students);

  //     setStudents(
  //       data.students.sort((a: StudentDataProps, b: StudentDataProps) => {
  //         const aEfficiency =
  //           a.details.report.dailyReport.date &&
  //           formatDate(new Date(a.details.report.dailyReport.date)) ===
  //             formatDate(new Date(Date.now()))
  //             ? a.details.report.dailyReport.overall
  //             : 0;
  //         const bEfficiency =
  //           b.details.report.dailyReport.date &&
  //           formatDate(new Date(b.details.report.dailyReport.date)) ===
  //             formatDate(new Date(Date.now()))
  //             ? b.details.report.dailyReport.overall
  //             : 0;
  //         return bEfficiency - aEfficiency;
  //       })
  //     );
  //   }
  //   setLoading(false);
  // }, [data, isSuccess]);
  
  return (
    <SafeAreaView className="bg-[#FEFBFF] flex-1">
      {/* Search Bar */}
      <View className="px-3 pb-[10.6px] flex-row justify-between gap-[10px] items-center flexx">
        <View className="w-[85%] flex flex-row justify-between items-center bg-[#EFEFEFAB] px-4 py-2 rounded-[8px]">
          <TextInput className=" w-[85%] " placeholder="Search a Student" />
          <TouchableOpacity activeOpacity={0.7}>
            <Feather name="search" size={20} color={"#A6A6A6"} />
          </TouchableOpacity>
        </View>
        <FilterModal />
      </View>

      {/* Filter Tabs */}
      <View className="flex-row px-4 gap-2 justify-between">
        {["All", "Excellent", "Optimal", "Inefficient"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text
              className={`rounded-[5.1px] bg-white px-[16px] py-[4px] ${
                activeTab === tab ? "text-black" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Students List */}
      <View className="flex-1 px-4 ">
        <View className="flex-row justify-between items-center mb-[12px] mt-[16px]">
          <Text className="text-lg font-semibold mb-2">All Students</Text>
          <Text className="text-[16px] font-medium text-[#9654F4] mb-2">
            See All
          </Text>
        </View>
        {isLoading || loading ? (
          <ScrollView className="w-full flex">
            {[...Array(7)].map((_, index) => (
              <StudentCardLoader key={index} />
            ))}
          </ScrollView>
        ) : isError || !data?.students || data.students.length === 0 ? (
          <NoDataFoundLottie message={isError ? "Error fetching students" : "No students found"} />
        ) : (
          <FlatList
            data={data.students}
            keyExtractor={(item) => item._id}
            className="mb-[50px] "
            renderItem={({ item }) => <StudentCard studentInfo={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
