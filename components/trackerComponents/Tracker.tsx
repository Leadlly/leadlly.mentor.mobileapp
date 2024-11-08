import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,Pressable } from "react-native";
import { getTracker } from "@/services/queries/trackerQuery";
import TrackerComponent from "./TrackerComponent";
import clsx from "clsx";


const Tracker = ({ studentId, studentSubjects }:any) => {
  const [activeSubject, setActiveSubject] = useState(studentSubjects[0]?.name); // Set the initial active subject

  // Fetch tracker data based on the active subject
  const { data, isLoading, isError, error } = getTracker(activeSubject, studentId);
  console.log(data,"trackerdata")

  // Handle subject tab change
  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
  };

  return (
    <View className="flex-1 bg-white p-4">
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-5"
      >
        <View className="flex-row gap-2">
          {studentSubjects?.map((subject) => (
            <Pressable
              key={subject.name}
              onPress={() => handleSubjectChange(subject.name)}
              className={clsx(
                "py-2 px-3 border rounded-lg",  // Reduced padding
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
      </ScrollView>


      <View className="border-b mb-4" />

      <ScrollView className="flex-1 mb-4 pr-3">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#E8DAFE',
  },
  activeTab: {
    backgroundColor: '#56249E',
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  errorText: {
    color: "red",
  },
});

export default Tracker;