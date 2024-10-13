import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
const moods = [
    { day: 'Mon', emoji: '😊', color: '#e0f7fa' },  // Happy
    { day: 'Tue', emoji: '😐', color: '#ffe0b2' },  // Neutral
    { day: 'Wed', emoji: '😔', color: '#ffccbc' },  // Sad
    { day: 'Thu', emoji: '😢', color: '#ffebee' },  // Very Sad
    { day: 'Fri', emoji: '😊', color: '#e0f7fa' },  // Happy
    { day: 'Sat', emoji: '😊', color: '#e0f7fa' },  // Happy
    { day: 'Sun', emoji: '😐', color: '#ffe0b2' },  // Neutral
  ];

export const WeeklyMood = () => {
    return (
      <View className="p-1 bg-white rounded-lg">
        <View className="flex text-[16px] mb-[28px] font-normal text-black flex-row justify-center items-center ">
         {/* calender */}
        <Text className="mr-4 font-semibold">&lt;</Text>
          <Text className="font-semibold">04 Jan - 11 Jan</Text>
         
          <Text className=" ml-4 font-semibold">&gt;</Text>
         
        </View>
        <View className="flex flex-row justify-between gap-[15px]">
          {moods.map((mood:any, index:any) => (
            <View key={index} className="items-center">
              <Text className="text-[12px] mb-1 text-black font-medium">{mood.day}</Text>
              <View 
                style={{ backgroundColor: mood.color }} 
                className="p-1 rounded-[5px] flex items-center justify-center"
              >
                <Text className="text-lg">{mood.emoji}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };