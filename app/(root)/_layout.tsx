import { Link, Tabs } from "expo-router";
import { tabBarItems } from "../../constants/constants";
import { Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import NotificationAndUserProfileButton from "@/components/NotificationAndUserProfileButton";


const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      {tabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Mada-SemiBold",
            },
            headerTitleAlign: "left",
            headerRight: () => {
              switch (item.name) {
                case "dashboard":
                  return <NotificationAndUserProfileButton />;
                default:
                  return null;
              }
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
