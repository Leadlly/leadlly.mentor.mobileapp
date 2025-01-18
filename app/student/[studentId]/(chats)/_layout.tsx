import { MaterialTobTabs } from "@/components/shared/MaterialTobTabsConfig";
import { colors } from "@/constants/constants";
import { useLocalSearchParams } from "expo-router";

const ChatLayout = () => {
  // Retrieve the studentId from search parameters
  const { studentId, student } = useLocalSearchParams<{
    studentId: string;
    student: string;
  }>();

  return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#6c757d",
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "Mada-SemiBold",
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: 3,
          borderRadius: 999,
        },
        tabBarStyle: {
          borderBottomColor: colors.inputBorder,
          borderBottomWidth: 1,
          backgroundColor: "#fff",
        },
      }}
    >
      {/* Chat Screen Tab */}
      <MaterialTobTabs.Screen
        key={`chat-${studentId}`}
        name="chat"
        options={{ title: "Chat" }}
        initialParams={{ studentId, student }}
      />

      {/* Meetings Screen Tab */}
      <MaterialTobTabs.Screen
        key={`meetings-${studentId}`}
        name="meetings"
        options={{ title: "Meetings" }}
        initialParams={{ studentId }}
      />
    </MaterialTobTabs>
  );
};

export default ChatLayout;
