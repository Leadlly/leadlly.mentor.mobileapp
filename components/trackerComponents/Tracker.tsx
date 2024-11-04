import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { getTracker } from "@/services/queries/trackerQuery";
import { useQuery } from "@tanstack/react-query";

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
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {studentSubjects.map((subject) => (
          <TouchableOpacity
            key={subject._id}
            onPress={() => handleSubjectChange(subject.name)}
            style={[
              styles.tab,
              activeSubject === subject.name && styles.activeTab
            ]}
          >
            <Text style={[
              styles.tabText,
              activeSubject === subject.name && styles.activeTabText
            ]}>
              {subject.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <Text>Loading tracker data...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>{error.message || "Error loading tracker data."}</Text>
      ) : (
        <View>
          {/* Render the fetched tracker data here */}
          <Text>Tracker Data for {activeSubject}:</Text>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      )}
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
