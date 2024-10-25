import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StudentDataProps } from "@/types/type";
import { moodEmojis, neutralEmoji } from "@/constants/moodEmojis";
import { getBackgroundColor } from "@/constants/efficiency";
import { formatDate } from "@/helpers/utils";

const StudentCard = ({ studentInfo }: { studentInfo: StudentDataProps }) => {
  const studentCurrentMood = studentInfo?.details?.mood;
  const today = new Date().toISOString().split("T")[0];

  const currentDateMoodIndex = studentCurrentMood?.findIndex(
    (mood) => mood.day === today
  );
  const moodOption =
    studentCurrentMood &&
    studentCurrentMood.length &&
    studentCurrentMood?.[currentDateMoodIndex]?.emoji
      ? moodEmojis[
          studentCurrentMood?.[currentDateMoodIndex]
            .emoji as keyof typeof moodEmojis
        ]
      : neutralEmoji;

  const cardBackgroundColor = useMemo(
    () =>
      getBackgroundColor(
        studentInfo.details.report.dailyReport.date &&
          formatDate(new Date(studentInfo.details.report.dailyReport.date)) ===
            formatDate(new Date(Date.now()))
          ? studentInfo.details.report.dailyReport.overall
          : 0
      ),
    [
      studentInfo.details.report.dailyReport.date,
      studentInfo.details.report.dailyReport.overall,
    ]
  );
  return (
    <Link
      href={`/(student)/dashboard?studentId=${String(studentInfo._id)}`}
      asChild
    >
      <TouchableOpacity
        className={`p-4 mb-2 rounded-xl ${cardBackgroundColor} `}
      >
        <View className="flex-row gap-[12px] items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View className="flex-col">
            <Text className="text-lg font-bold">{studentInfo.firstname}</Text>
            <Text className="text-gray-700">
              Class: {studentInfo.academic.standard}
            </Text>
            <Text className="text-gray-700">
              Level: {studentInfo.details.level.number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StudentCard;
