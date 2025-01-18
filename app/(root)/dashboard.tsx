import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import StudentCardLoader from "@/components/LoadingComponents/StudentCardLoader";
import NoDataFoundLottie from "@/components/shared/NoDataFoundLottie";
import BottomSheet from "@/components/shared/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ScheduleMeetingForm from "@/components/MeetingComponents/ScheduleMeetingForm";
import { colors } from "@/constants/constants";
import NotificationForm from "@/components/shared/NotificationForm";
import { registerForPushNotificationsAsync } from "@/helpers/registerForPushNotificationsAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavePushToken } from "@/services/queries/notificationQuery";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data, isError, isLoading } = useGetAllocatedStudents();
  const [loading, setLoading] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const notificationBottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentNotificationModal = useCallback(() => {
    notificationBottomSheetRef.current?.present();
  }, []);

  const handleClose = () => {
    bottomSheetModalRef.current?.dismiss();
    notificationBottomSheetRef.current?.dismiss();
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedStudents([]);
  };

  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      const newSelectedStudents = selectedStudents.filter(
        (id) => id !== studentId
      );
      setSelectedStudents(newSelectedStudents);
      if (newSelectedStudents.length === 0) {
        setSelectMode(false);
      }
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const { mutateAsync: savePushToken } = useSavePushToken();

  useEffect(() => {
    const getPushToken = async () => {
      const pushTokenString = await registerForPushNotificationsAsync();
      const storedPushToken = await AsyncStorage.getItem("mentorPushToken");

      if (pushTokenString !== storedPushToken) {
        await savePushToken({ pushToken: pushTokenString });
        await AsyncStorage.setItem("mentorPushToken", pushTokenString);
      }
    };

    getPushToken();
  }, []);

  return (
    <View className="bg-[#FEFBFF] flex-1">
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
        <View className="flex-row justify-between items-center mb-[12px] mt-[16px] h-10">
          {selectMode ? (
            <View style={{ width: "100%" }}>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  className={`${selectedStudents.length > 0 ? "bg-primary/10 border border-primary" : "bg-gray-300 border border-transparent"} px-3 py-2 rounded-md flex-1 items-center justify-center flex-row`}
                  onPress={handlePresentModalPress}
                  disabled={selectedStudents.length === 0}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color={
                      selectedStudents.length > 0 ? colors.primary : "gray"
                    }
                  />
                  <Text
                    className={`${selectedStudents.length > 0 ? "text-primary" : "text-gray-500"} text-xs ml-1 font-mada-semibold`}
                  >
                    Schedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`${selectedStudents.length > 0 ? "bg-primary/10 border border-primary" : "bg-gray-300 border border-transparent"} px-3 py-2 rounded-md flex-1 items-center justify-center flex-row`}
                  onPress={handlePresentNotificationModal}
                  disabled={selectedStudents.length === 0}
                >
                  <MaterialIcons
                    name="notifications"
                    size={16}
                    color={
                      selectedStudents.length > 0 ? colors.primary : "gray"
                    }
                  />
                  <Text
                    className={`${selectedStudents.length > 0 ? "text-primary" : "text-gray-500"} text-xs ml-1 font-mada-semibold`}
                  >
                    Notify
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`${selectedStudents.length === 0 || selectedStudents.length === data?.students?.length ? "bg-gray-200" : "bg-blue-500"} px-3 py-2 rounded-md flex-1 items-center justify-center flex-row`}
                  onPress={() => {
                    if (selectedStudents.length === data?.students?.length) {
                      setSelectedStudents([]);
                    } else {
                      setSelectedStudents(
                        data?.students?.map((s: any) => s._id) || []
                      );
                    }
                  }}
                >
                  <Feather
                    name={
                      selectedStudents.length === data?.students?.length
                        ? "square"
                        : "check-square"
                    }
                    size={16}
                    color={
                      selectedStudents.length === 0 ||
                      selectedStudents.length === data?.students?.length
                        ? "gray"
                        : "white"
                    }
                  />
                  <Text
                    className={`${selectedStudents.length === 0 || selectedStudents.length === data?.students?.length ? "text-gray-600" : "text-white"} text-xs ml-1 font-medium`}
                  >
                    {selectedStudents.length === data?.students?.length
                      ? "None"
                      : "All"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-200 px-3 py-2 rounded-md flex-1 items-center justify-center flex-row"
                  onPress={toggleSelectMode}
                >
                  <Feather name="x" size={16} color="gray" />
                  <Text className="text-gray-800 text-xs ml-1">Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text className="text-lg font-semibold">All Students</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleSelectMode}
                className="bg-primary px-3 py-2 rounded-md  items-center justify-center flex-row"
              >
                <Text className="text-white font-medium text-xs">
                  Select Students
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {isLoading || loading ? (
          <ScrollView className="w-full flex">
            {[...Array(7)].map((_, index) => (
              <StudentCardLoader key={index} />
            ))}
          </ScrollView>
        ) : isError || !data?.students || data.students.length === 0 ? (
          <NoDataFoundLottie
            message={isError ? "Error fetching students" : "No students found"}
          />
        ) : (
          <FlatList
            data={data.students}
            keyExtractor={(item) => item._id}
            className="mb-[50px] "
            renderItem={({ item }) => (
              <StudentCard
                studentInfo={item}
                selectMode={selectMode}
                isSelected={selectedStudents.includes(item._id)}
                toggleSelectMode={toggleSelectMode}
                onSelect={() => toggleStudentSelection(item._id)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomSheet ref={bottomSheetModalRef} snapPoints={["50%"]}>
        <ScheduleMeetingForm
          studentIds={selectedStudents}
          onClose={handleClose}
        />
      </BottomSheet>
      <BottomSheet ref={notificationBottomSheetRef}>
        <NotificationForm studentIds={selectedStudents} onClose={handleClose} />
      </BottomSheet>
    </View>
  );
};

export default Dashboard;
