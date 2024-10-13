import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { colors, progressAnalyticsMenus } from "../../constants/constants";
import clsx from "clsx";
import { useState } from "react";
import Animated from "react-native-reanimated";
import BarChart from "../charts/BarChart";
import MonthlyReportChart from "../charts/MonthlyReportChart";
import OverallReportChart from "../charts/OverallReportChart";
import {
  useGetMonthlyReport,
  useGetOverallReport,
  useGetWeeklyReport,
} from "../../services/queries/studentReportQuery";
import TabNav from "../shared/TabNav";

const ProgressAnalytics = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const { data: weeklyReportData, isLoading: weeklyReportLoading } =
    useGetWeeklyReport();
  const { data: monthlyReportData, isLoading: monthlyReportLoading } =
    useGetMonthlyReport();
  const { data: overallReportData, isLoading: overallReportLoading } =
    useGetOverallReport();

  return (
    <View className="my-1.5 border border-input-border rounded-xl p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-[15px] font-mada-Bold leading-tight">
          Progress Analytics
        </Text>

        <TabNav
          items={progressAnalyticsMenus}
          activeItem={activeTab}
          setActiveItem={setActiveTab}
          width={150}
          height={24}
          itemClassName="px-2 h-6"
        />
      </View>

      <View className="flex-row justify-end space-x-5 my-5">
        <View className="flex-row items-center space-x-1.5">
          <View className="w-2.5 h-2.5 rounded-sm bg-primary" />
          <Text className="text-sm leading-none font-mada-medium">
            Revision Session
          </Text>
        </View>
        <View className="flex-row items-center space-x-1.5">
          <View className="w-2.5 h-2.5 rounded-sm bg-leadlly-cyan" />
          <Text className="text-sm leading-none font-mada-medium">Quizzes</Text>
        </View>
      </View>

      {activeTab === "weekly" && (
        <View style={{ height: 180 }}>
          {weeklyReportLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : (
            <BarChart weeklyProgress={weeklyReportData?.weeklyReport} />
          )}
        </View>
      )}

      {activeTab === "monthly" && (
        <View style={{ height: 180 }}>
          {monthlyReportLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : (
            <MonthlyReportChart
              monthlyProgress={monthlyReportData?.monthlyReport}
            />
          )}
        </View>
      )}

      {activeTab === "overall" && (
        <View style={{ height: 180 }}>
          {overallReportLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : (
            <OverallReportChart
              overallProgress={
                overallReportData && overallReportData.overallReport
                  ? overallReportData.overallReport
                  : []
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ProgressAnalytics;
