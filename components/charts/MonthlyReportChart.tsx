import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TStudentReportProps } from "../../types/types";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "../../constants/constants";
import { getMonthDate } from "../../helpers/utils";

const MonthlyReportChart = ({
  monthlyProgress,
}: {
  monthlyProgress: TStudentReportProps | null;
}) => {
  const { width } = Dimensions.get("window");

  const sessionData =
    monthlyProgress && monthlyProgress.days && monthlyProgress.days.length > 0
      ? monthlyProgress.days.map((data) => ({
          value: data.session,
          dataPointText: getMonthDate(new Date(data.date)),
          dataPointColor: colors.primary,
        }))
      : [{ value: 0 }];

  const quizData =
    monthlyProgress && monthlyProgress.days && monthlyProgress.days.length > 0
      ? monthlyProgress.days.map((data) => ({
          value: data.quiz,
          dataPointText: getMonthDate(new Date(data.date)),
          dataPointColor: colors.leadllyCyan,
        }))
      : [{ value: 0 }];

  return (
    <View>
      <LineChart
        areaChart
        curved
        data={sessionData}
        data2={quizData}
        // hideDataPoints
        spacing={50}
        color1={colors.primary}
        color2={colors.leadllyCyan}
        initialSpacing={0}
        hideRules
        startFillColor1={colors.primary}
        endFillColor1={colors.primary}
        startFillColor2={colors.leadllyCyan}
        endFillColor2={colors.leadllyCyan}
        startOpacity={0.3}
        endOpacity={0.1}
        hideYAxisText
        thickness={1}
        height={150}
        width={width - 100}
        isAnimated
        animationDuration={1000}
      />

      <View className="flex-row justify-between -mt-4">
        <Text className="text-xs text-tab-item-gray leading-none font-mada-medium">
          {getMonthDate(new Date(monthlyProgress?.startDate!))}
        </Text>
        <Text className="text-xs text-tab-item-gray leading-none font-mada-medium">
          {getMonthDate(new Date(monthlyProgress?.endDate!))}
        </Text>
      </View>
    </View>
  );
};

export default MonthlyReportChart;
