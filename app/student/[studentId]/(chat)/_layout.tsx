import { colors } from '@/constants/constants';
import { MaterialTobTabs } from '@/components/shared/MaterialTobTabsConfig';


const ChatLayout = () => {
	return (
    <MaterialTobTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#000000",
        tabBarLabelStyle: {
          fontSize: 15,
          paddingVertical: 2,
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
        },
      }}
    >
      <MaterialTobTabs.Screen name="chat" options={{ title: "chat" }} />
      <MaterialTobTabs.Screen
        name="requestMeeting"
        options={{ title: "Request Meeting" }}
      />
    </MaterialTobTabs>
  );
};

export default ChatLayout;
