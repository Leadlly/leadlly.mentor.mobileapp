import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Pressable } from "react-native";
import { getTracker } from "@/services/queries/trackerQuery";
import TrackerComponent from "./TrackerComponent";
import clsx from "clsx";
import { useRouter } from "expo-router";


const Tracker = ({ studentId, studentSubjects }:any) => {
  const router = useRouter()
  const [activeSubject, setActiveSubject] = useState(studentSubjects[0]?.name); // Set the initial active subject

  // Fetch tracker data based on the active subject
  const { data, isLoading, isError, error } = getTracker(activeSubject, studentId);
  console.log(data,"trackerdata")

  // Handle subject tab change
  const handleSubjectChange = (subject:string) => {
    setActiveSubject(subject);
  };

  return (
    <View className="flex-1 bg-white p-4">
      
      <View className="flex-row items-center justify-between mb-5">
        {studentSubjects?.map((subject:any) => (
          <Pressable
            key={subject.name}
            onPress={() => handleSubjectChange(subject.name)}
            className={clsx(
              "h-9 px-4 border items-center justify-center rounded-lg",
              subject.name === activeSubject
                ? "border-primary bg-primary/10"
                : "border-tab-item-gray bg-transparent"
            )}
          >
            <Text
              className={clsx(
                "capitalize text-sm font-mada-semibold",
                subject.name === activeSubject
                  ? "text-primary"
                  : "text-tab-item-gray"
              )}
            >
              {subject.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1 mb-4 " showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingRight: 0 }}>
        {activeSubject && (
          <TrackerComponent
            activeSubject={activeSubject}
            trackerData={data}
            userSubjects={studentSubjects}
          />
        )}
      </ScrollView>
    </View>
  );
};


export default Tracker;