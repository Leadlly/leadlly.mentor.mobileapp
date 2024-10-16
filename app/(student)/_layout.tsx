import { Link, Tabs } from "expo-router";
import { studentTabBarItems } from "../../constants/constants";
import StudentTabBar from "@/components/students/StudentTabBar";
import { useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import NotificationAndUserProfileButton from "@/components/NotificationAndUserProfileButton";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";

const TabsLayout = ({ navigation }:any) => {
  const { studentId } = useLocalSearchParams();

  const student = Array.isArray(studentId) ? studentId[0] : studentId;

  const { data, isError, isSuccess, error } =
    useGetAllocatedStudents(student);

  return (
    <Tabs tabBar={(props) => <StudentTabBar {...props} />}>
      {studentTabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name === "dashboard" ? `${data?.student?.firstname}` : item.title,
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
