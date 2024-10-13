import { Link, Tabs } from "expo-router";
import { studentTabBarItems } from "../../constants/constants";
import StudentTabBar from "@/components/students/StudentTabBar";
import { useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import NotificationAndUserProfileButton from "@/components/NotificationAndUserProfileButton";

const TabsLayout = ({ navigation }:any) => {
  const { name } = useLocalSearchParams();
  const firstName = typeof name === 'string' ? name.split(" ")[0] : "";

  return (
    <Tabs tabBar={(props) => <StudentTabBar {...props} />}>
      {studentTabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name === "dashboard" ? `Hi, I am ${firstName}` : item.title,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Mada-SemiBold",
            },
            headerTitleAlign: "left",
            headerLeft: () => (
              <Link href="/(root)/dashboard" asChild>
              <TouchableOpacity  style={{ paddingLeft: 15 }}>
                <Octicons name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              </Link>
              
            ),
            headerRight: () => {
              if (item.name === "dashboard") {
                return <NotificationAndUserProfileButton/>
              }
              return null;
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
