import { Dimensions, View } from "react-native";
import { BarChart as Chart } from "react-native-gifted-charts";
import { TStudentReportProps } from "../../types/types";
import { colors } from "../../constants/constants";

const BarChart = ({
  weeklyProgress,
}: {
  weeklyProgress: TStudentReportProps | null;
}) => {
  const { width } = Dimensions.get("window");

  const data =
    weeklyProgress && weeklyProgress.days && weeklyProgress.days.length > 0
      ? weeklyProgress?.days.flatMap((day) => [
          {
            value: day.session,
            label: day.day.slice(0, 3),
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
            frontColor: colors.primary,
          },
          {
            value: day.quiz,
            frontColor: colors.leadllyCyan,
          },
        ])
      : [
          {
            value: 0,
            label: "Mon",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Tue",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Wed",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Thu",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Fri",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Sat",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
          {
            value: 0,
            label: "Sun",
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {
              color: colors.tabItemGray,
              fontFamily: "Mada-Medium",
            },
          },
          {
            value: 0,
          },
        ];

  return (
    <View className="flex-1">
      <Chart
        data={data}
        barWidth={10}
        spacing={20}
        barBorderTopLeftRadius={3}
        barBorderTopRightRadius={3}
        height={150}
        width={width - 100}
        hideRules={true}
        hideYAxisText={true}
        isAnimated
        animationDuration={1000}
      />
    </View>
  );
};

export default BarChart;
