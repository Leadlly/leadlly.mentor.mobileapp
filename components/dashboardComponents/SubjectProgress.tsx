import { View, Text } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/constants";
import SemiRadialChart from "../charts/SemiRadialChart";
import TabNav from "../shared/TabNav";
import { ISubject } from "@/types/type";


interface SubjectProgressProps {
  subjects?: ISubject[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subjects = [] }) => {
  const [activeSubject, setActiveSubject] = useState(subjects[0]?.name || "");

  const subject = subjects.find((subject) => subject.name === activeSubject);

  return (
    <View className="mb-[20px] border border-input-border rounded-2xl py-3">
      <View className="flex-row items-center justify-between px-3">
        <Text className="text-[15px] font-mada-Bold leading-tight">
          Subject Progress
        </Text>

        <TabNav
          items={subjects}
          activeItem={activeSubject}
          setActiveItem={setActiveSubject}
          width={200}
          height={24}
          itemClassName="px-2 h-6"
        />
      </View>

      <View className="mt-5 mb-3 flex-row justify-between items-center px-5">
        <SemiRadialChart
          data={subject?.overall_progress || 0}
          color={colors.primary}
          bgColor="#f6f1fd"
          legendText="Revision Session"
        />
        <SemiRadialChart
          data={subject?.overall_efficiency || 0}
          color={colors.leadllyCyan}
          bgColor="#f5fbfc"
          legendText="Efficiency"
        />
      </View>
    </View>
  );
};

export default SubjectProgress;
