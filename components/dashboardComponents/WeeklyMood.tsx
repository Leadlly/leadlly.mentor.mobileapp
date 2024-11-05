import { moodEmojis } from "@/constants/moodEmojis";
import { Image } from "expo-image";
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

type MoodData = {
  mood: Array<{ day: string; date?: string | null; emoji?: string | null }>;
};
export const WeeklyMood = ({ mood }: MoodData) => {
  const getWeekDates = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });
    };

    return {
      startDate: formatDate(weekAgo),
      endDate: formatDate(today),
    };
  };

  const { startDate, endDate } = getWeekDates();
  console.log(mood);

  return (
    <View className="p-1 bg-white rounded-lg">
      <View className="flex text-[16px] mb-[28px] font-normal text-black flex-row justify-center items-center ">
        {/* calender */}
        {/* <Text className="mr-4 font-semibold">&lt;</Text> */}
        <Text className="font-semibold">
          {startDate} - {endDate}
        </Text>

        {/* <Text className=" ml-4 font-semibold">&gt;</Text> */}
      </View>
      <View className="flex flex-row justify-between gap-[15px]">
        {mood.map((mood: any, index: any) => (
          <View key={index} className="items-center">
            <Text className="text-[12px] mb-1 text-black font-medium">
              {mood.day.slice(0, 3)}
            </Text>
            <View
              style={{
                backgroundColor:
                  moodEmojis[
                    (mood.emoji ?? "neutral") as keyof typeof moodEmojis
                  ].color + "80",
                borderColor:
                  moodEmojis[
                    (mood.emoji ?? "neutral") as keyof typeof moodEmojis
                  ].color + "CC",
              }}
              className="p-[5px] rounded-[5px] flex items-center justify-center border"
            >
              <Image
                source={
                  moodEmojis[
                    (mood.emoji ?? "neutral") as keyof typeof moodEmojis
                  ].moodImg
                }
                alt={
                  moodEmojis[
                    (mood.emoji ?? "neutral") as keyof typeof moodEmojis
                  ].mood
                }
                className="w-4 h-4 "
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
