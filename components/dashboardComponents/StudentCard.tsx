import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StudentDataProps } from "@/types/type";
import { moodEmojis, neutralEmoji } from "@/constants/moodEmojis";
import { getBackgroundColor } from "@/constants/efficiency";
import { formatDate } from "@/helpers/utils";
import * as Progress from "react-native-progress";
const StudentCard = ({ studentInfo }: { studentInfo: StudentDataProps }) => {
  const studentCurrentMood = studentInfo?.details?.mood;
  const today = new Date().toISOString().split("T")[0];

  const currentDateMoodIndex = studentCurrentMood?.findIndex(
    (mood) => mood?.date === today
  );
  console.log(currentDateMoodIndex)
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
    <Link href={`/student/${String(studentInfo._id)}/dashboard`} asChild>
      <TouchableOpacity
        className={`p-4 mb-2 rounded-xl ${cardBackgroundColor} `}
      >
        <View className="flex-row gap-[12px] items-center">
          <View className="flex-row  items-center flex ">
            {studentInfo.avatar?.url ? (
              <Image
                source={{ uri: studentInfo.avatar?.url }}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <View className="w-12 h-12 rounded-full  bg-white flex items-center justify-center border border-white">
                <Text className="text-xl font-bold text-primary ">
                  {`${studentInfo.firstname.charAt(0)}${studentInfo?.lastname?.charAt(0) ?? ""}`.toUpperCase()}
                </Text>
              </View>
            )}

            <Image
              source={moodOption.moodImg}
              alt="checkbox-label"
              className="w-4 h-4 -translate-x-3 translate-y-4"
            />
          </View>
          <View className="flex-col">
            <Text className="text-lg font-bold">{studentInfo.firstname}</Text>
            <Text className="text-gray-700">
              Class: {studentInfo.academic.standard}
            </Text>
            <View className="flex-row items-baseline gap-2  ">
              <Text className="text-gray-700">Level:</Text>
              <Progress.Bar
                animated
                color="#339900"
                borderWidth={0}
                unfilledColor="#D3D3D3"
                progress={studentInfo.details.level.number * 0.3 ?? 0}
                width={130}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StudentCard;
