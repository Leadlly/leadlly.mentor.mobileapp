import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Plannercontent from "@/components/plannerComponent/plannercontent"; // Ensure PlannerContent is React Native compatible
import { useGetPlanner } from "@/services/queries/plannerQuery";

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
  const { studentId } = route.params;
  const [data, setData] = useState<Planner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useGetPlanner(studentId);
        if (result === null) {
          setError("No planner exists for current time");
        } else {
          setData(result.data);
        }
      } catch (err) {
        setError("An error occurred while fetching planner");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text className="text-[#9654F4]">Weekly Planner</Text>
      </View>
      {data && data.days ? (
        <Plannercontent weekstopic={data.days} />
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
