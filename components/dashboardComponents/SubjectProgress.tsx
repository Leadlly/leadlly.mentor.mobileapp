import { View, Text } from "react-native";
import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { colors } from "../../constants/constants";
import clsx from "clsx";
import SemiRadialChart from "../charts/SemiRadialChart";
import TabNav from "../shared/TabNav";

// Mock userSubjects data
const mockUserSubjects = [
  {
    name: "Mathematics",
    overall_progress: 70,
    overall_efficiency: 80,
  },
  {
    name: "Science",
    overall_progress: 85,
    overall_efficiency: 75,
  },
  {
    name: "History",
    overall_progress: 60,
    overall_efficiency: 65,
  },
];

const SubjectProgress = () => {
  const userSubjects = mockUserSubjects; // Use the mock data here

  const [activeSubject, setActiveSubject] = useState(userSubjects?.[0]?.name);

  const subject = userSubjects?.find(
    (subject) => subject?.name === activeSubject
  );

  return (
    <View className="my-1.5 border border-input-border rounded-xl py-3">
      <View className="flex-row items-center justify-between px-3">
        <Text className="text-[15px] font-mada-Bold leading-tight">
          Subject Progress
        </Text>

        <TabNav
          items={userSubjects || []}
          activeItem={activeSubject!}
          setActiveItem={setActiveSubject}
          width={200}
          height={24}
          itemClassName="px-2 h-6"
        />
      </View>

      <View className="mt-5 mb-3 flex-row justify-between items-center px-5">
        <SemiRadialChart
          data={subject?.overall_progress!}
          color={colors.primary}
          bgColor="#f6f1fd"
          legendText="Revision Session"
        />
        <SemiRadialChart
          data={subject?.overall_efficiency!}
          color={colors.leadllyCyan}
          bgColor="#f5fbfc"
          legendText="Efficiency"
        />
      </View>
    </View>
  );
};

export default SubjectProgress;
