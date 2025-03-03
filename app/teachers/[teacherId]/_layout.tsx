import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  horizontalScale,
  moderateScale,
  teachersTabBarItems,
} from "@/constants/constants";
import TeacherTabBar from "@/components/teachers/TeacherTabBar";
import { Feather } from "@expo/vector-icons";

const TeachersLayout = () => {
  return (
    <Tabs tabBar={(props) => <TeacherTabBar {...props} />}>
      {teachersTabBarItems.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            headerTitle: () => (
              <View>
                <Text
                  className="font-mada-semibold"
                  style={{
                    fontSize: moderateScale(22),
                  }}
                >
                  {item.headerTitle}
                </Text>
              </View>
            ),
            headerRight: () => (
              <View className="flex-row items-center gap-x-3 flex-1 mr-4">
                <TouchableOpacity
                  className="bg-primary/10 rounded-xl"
                  style={{
                    paddingHorizontal: horizontalScale(9),
                    paddingVertical: horizontalScale(9),
                  }}
                >
                  <Feather name="bell" size={moderateScale(18)} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-primary/10 rounded-full items-center justify-center"
                  style={{
                    width: horizontalScale(36),
                    height: horizontalScale(36),
                  }}
                >
                  <Text
                    className="font-mada-semibold"
                    style={{ fontSize: moderateScale(14) }}
                  >
                    A
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TeachersLayout;
