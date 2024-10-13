import { View, Text, Dimensions } from "react-native";
import React from "react";
import { TStudentOverallReportProps } from "../../types/types";
import { LineChart } from "react-native-gifted-charts";
import { colors } from "../../constants/constants";
import { getMonthDate } from "../../helpers/utils";

const OverallReportChart = ({
  overallProgress,
}: {
  overallProgress: TStudentOverallReportProps[] | null;
}) => {
  const { width } = Dimensions.get("window");

  const sessionData =
    overallProgress && overallProgress.length > 0
      ? overallProgress.map((data) => ({
          value: Math.round(data.session),
          dataPointText: getMonthDate(new Date(data.date)),
          dataPointColor: colors.primary,
        }))
      : [{ value: 0 }];

  const quizData =
    overallProgress && overallProgress.length > 0
      ? overallProgress.map((data) => ({
          value: Math.round(data.quiz),
          dataPointText: getMonthDate(new Date(data.date)),
          dataPointColor: colors.leadllyCyan,
        }))
      : [{ value: 0 }];

  return (
    <View className="flex-1">
      <LineChart
        areaChart
        data={sessionData}
        data2={quizData}
        // hideDataPoints
        spacing={50}
        initialSpacing={0}
        hideYAxisText
        color1={colors.primary}
        color2={colors.leadllyCyan}
        startFillColor1={colors.primary}
        endFillColor1={colors.primary}
        startFillColor2={colors.leadllyCyan}
        endFillColor2={colors.leadllyCyan}
        startOpacity={0.3}
        endOpacity={0.3}
        thickness={1}
        hideRules
        height={150}
        width={width - 100}
        isAnimated
        animationDuration={1000}
      />
    </View>
  );
};

export default OverallReportChart;
