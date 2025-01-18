import { Link, Tabs } from "expo-router";
import { colors, studentTabBarItems } from "../../../constants/constants";
import StudentTabBar from "@/components/students/StudentTabBar";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import NotificationAndUserProfileButton from "@/components/NotificationAndUserProfileButton";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";
import { useGetUnreadNotifications } from "@/services/queries/chatQuery";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { useEffect } from "react";
import { unreadMessages } from "@/services/redux/slices/unreadMessageSlice";

const TabsLayout = ({ navigation }: any) => {
  const { studentId } = useLocalSearchParams();
  const mentor = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const student = Array.isArray(studentId) ? studentId[0] : studentId;

  const { data, isLoading } = useGetAllocatedStudents(student);

  const { data: chatNotificationsData, isLoading: chatMessagesLoading } =
    useGetUnreadNotifications({
      receiver: mentor?._id,
      room: data?.student?.email,
    });

  useEffect(() => {
    if (chatMessagesLoading) return;

    if (
      chatNotificationsData &&
      chatNotificationsData.unreadCount &&
      chatNotificationsData.unreadCount.length > 0
    ) {
      const unreadMessagesForUser = chatNotificationsData.unreadCount.find(
        (message: { room: string; messageCount: number }) =>
          message.room === data?.student?.email
      );
      dispatch(unreadMessages(unreadMessagesForUser?.messageCount));
    }
  }, [chatNotificationsData, chatMessagesLoading]);

  if (isLoading || chatMessagesLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator color={colors.primary} size={"small"} />
      </View>
    );
  }

  return (
    <Tabs tabBar={(props) => <StudentTabBar {...props} />}>
      {studentTabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            // title:
            //   item.name === "dashboard"
            //     ? `${data?.student?.firstname}`
            //     : item.title,
            headerTitle: item.title,
            title: data?.student?.firstname
              ? `${data.student.firstname}`
              : "Loading...",

            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Mada-SemiBold",
            },
            headerTitleAlign: "left",
            headerLeft: () => (
              <Link href="/(root)/dashboard" asChild>
                <TouchableOpacity style={{ paddingLeft: 15 }}>
                  <Octicons name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              </Link>
            ),
            headerRight: () => {
              if (item.name === "dashboard") {
                return <NotificationAndUserProfileButton />;
              }
              return null;
            },
          }}
          initialParams={
            item.name === "(chats)"
              ? { student: JSON.stringify(data?.student) }
              : {}
          }
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
