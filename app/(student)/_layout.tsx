import { Link, Tabs } from "expo-router";
import { studentTabBarItems } from "../../constants/constants";
import { Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import UpgradeAndUserProfileButton from "@/components/UpgradeAndUserProfileButton";
import StudentTabBar from "@/components/students/StudentTabBar";

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <StudentTabBar {...props} />}>
      {studentTabBarItems.map((item) => (
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
                  return <UpgradeAndUserProfileButton />;
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
