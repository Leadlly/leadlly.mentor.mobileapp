import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/constants/constants";
import DailyReport from "@/components/dashboardComponents/DailyReport";
import { useState } from "react";
import SemiRadialChart from "@/components/charts/SemiRadialChart";
import { PlanItem } from "@/components/dashboardComponents/PlanItem";
import { WeeklyMood } from "@/components/dashboardComponents/WeeklyMood";
import { StreakTabs } from "@/components/dashboardComponents/StreakTabs";
import { useLocalSearchParams } from "expo-router";
import { useGetAllocatedStudents } from "@/services/queries/userQuery";
import { StudentDataProps } from "@/types/type";
import TodaysPlan from "@/components/dashboardComponents/TodaysPlan";
import { formatDate } from "@/helpers/utils";
import SubjectProgress from "@/components/dashboardComponents/SubjectProgress";
import ProgressAnalytics from "@/components/dashboardComponents/ProgressAnalytics";
import LottieView from "lottie-react-native";
import { useStudentData } from "@/helpers/Hooks/StudentDataHook";

const StudentDashboard = () => {
  const loading_animation = useRef<LottieView>(null);
  const { student, isError, isSuccess, error, isLoading } = useStudentData();
 
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white min-h-screen flex">
        <LottieView
          ref={loading_animation}
          source={require("../../../assets/dashboard_loading.json")}
          autoPlay
          loop={true}
          style={{
            width: "100%",
            height: "10%",
          }}
        />
        <Text className="text-lg font-mada-medium text-gray-600 mt-4">
          Loading student dashboard...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 16,
        marginBottom: 50,
      }}
      className=""
    >
      {/* Today's Plan */}
      <TodaysPlan id={student._id} />

      <DailyReport
        dailyreportquiz={
          student.details.report.dailyReport.date &&
          formatDate(new Date(student.details.report.dailyReport.date)) ===
            formatDate(new Date(Date.now()))
            ? student.details.report.dailyReport.quiz
            : 0
        }
        dailyreportsession={
          student.details.report.dailyReport.date &&
          formatDate(new Date(student.details.report.dailyReport.date)) ===
            formatDate(new Date(Date.now()))
            ? student.details.report.dailyReport.session
            : 0
        }
      />

      {/* Weekly Mood */}
      <View className="p-4 bg-white rounded-2xl border border-[#ddd] mb-5">
        <WeeklyMood mood={student.details.mood} />
      </View>

      {/* Streak Questions */}
      {/* <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 16,
          borderColor: "#ddd",
          borderWidth: 1,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Streak Questions
          </Text>
          <Text style={{ color: colors.primary }}>Total: 30</Text>
        </View>
        <StreakTabs />
      </View> */}

      <SubjectProgress subjects={student.academic.subjects} />
      <ProgressAnalytics id={student._id} />
    </ScrollView>
  );
};

export default StudentDashboard;
