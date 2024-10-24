import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Plannercontent from "@/components/plannerComponent/plannercontent"; // Ensure PlannerContent is React Native compatible
import { useGetPlanner } from "@/services/queries/plannerQuery";
import { useLocalSearchParams } from "expo-router";

interface Planner {
  days: any[];
}

interface Props {
  route: {
    params: {
      studentId: string;
    };
  };
}

export default function Page({ route }: Props) {
  const { studentId } = useLocalSearchParams();
  console.log(studentId, "here");
  const [planner, setPlanner] = useState<Planner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, isError, isSuccess, error } = useGetPlanner(studentId);

  console.log(data, "here is")
  useEffect(() => {
    if (isSuccess && data) {
      setPlanner(data.data);
      setLoading(false); // Stop loading when data is fetched successfully
    } else if (isError) {
      setLoading(false); // Stop loading in case of an error
    }
  }, [isSuccess, isError, data]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error?.message || "An error occurred"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text className="text-[#9654F4]">Weekly Planner</Text>
      </View>
      {planner && planner.days ? (
        <Plannercontent weekstopic={planner?.days} />
      ) : (
        <Text>No planner exists for current period</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    backgroundColor: "#E8DAFE",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
