import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import ChemistryIcon from "@/components/icons/ChemistryIcon";
import MathIcons from "@/components/icons/MathIcons";
import PhysicsIcon from "@/components/icons/PhysicsIcon";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/constants";
import clsx from "clsx";

const classes = [
  {
    id: "1",
    name: "Omega",
    standard: "11",
    subject: "chemistry",
    students: 480,
  },
  {
    id: "2",
    name: "Sigma",
    standard: "11",
    subject: "mathematics",
    students: 480,
  },
  {
    id: "3",
    name: "Omega",
    standard: "11",
    subject: "physics",
    students: 480,
  },
  {
    id: "4",
    name: "Omega",
    standard: "11",
    subject: "physics",
    students: 480,
  },
  {
    id: "5",
    name: "Omega",
    standard: "11",
    subject: "mathematics",
    students: 480,
  },
  {
    id: "6",
    name: "Omega",
    standard: "11",
    subject: "physics",
    students: 480,
  },
  {
    id: "7",
    name: "Omega",
    standard: "11",
    subject: "chemistry",
    students: 480,
  },
];

const TeachersClasses = () => {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className="border border-input-border rounded-xl"
            style={{
              paddingHorizontal: moderateScale(16),
              paddingVertical: moderateScale(20),
            }}
          >
            <View className="flex-row justify-between">
              <View className="flex-row items-center gap-x-3">
                <View
                  style={{
                    width: horizontalScale(42),
                    height: horizontalScale(42),
                  }}
                  className={clsx(
                    "items-center justify-center rounded-full",
                    item.subject === "chemistry"
                      ? "bg-[#1472FF]"
                      : item.subject === "mathematics"
                        ? "bg-primary"
                        : item.subject === "physics"
                          ? "bg-[#27CEB2]"
                          : null
                  )}
                >
                  {item.subject === "chemistry" ? (
                    <ChemistryIcon stroke="white" />
                  ) : item.subject === "mathematics" ? (
                    <MathIcons stroke="white" />
                  ) : item.subject === "physics" ? (
                    <PhysicsIcon fill="white" stroke="white" />
                  ) : null}
                </View>
                <View>
                  <Text
                    className="font-mada-semibold"
                    style={{ fontSize: moderateScale(19) }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="font-mada-regular text-tab-item-gray"
                    style={{ fontSize: moderateScale(12) }}
                  >
                    {item.standard}th class
                  </Text>
                </View>
              </View>
              <View
                className="bg-primary/10 items-center justify-center rounded-full"
                style={{
                  paddingHorizontal: moderateScale(8),
                  height: verticalScale(26),
                }}
              >
                <Text
                  className="font-mada-semibold text-primary text-center"
                  style={{ fontSize: moderateScale(10) }}
                >
                  {item.students} students
                </Text>
              </View>
            </View>
            <View className="mt-3 flex-row justify-between items-end">
              <View>
                <Text
                  style={{ fontSize: moderateScale(16) }}
                  className="font-mada-regular text-tab-item-gray"
                >
                  Sub:{" "}
                  <Text className="font-mada-medium text-black capitalize">
                    {item.subject}
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  paddingHorizontal: horizontalScale(16),
                  paddingVertical: verticalScale(6),
                }}
                className="bg-primary rounded-lg"
              >
                <Text
                  style={{ fontSize: moderateScale(13) }}
                  className="font-mada-semibold text-white text-center"
                >
                  Add Work
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{
          marginHorizontal: moderateScale(16),
          gap: moderateScale(16),
          paddingVertical: moderateScale(16),
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
      />
    </View>
  );
};

export default TeachersClasses;
