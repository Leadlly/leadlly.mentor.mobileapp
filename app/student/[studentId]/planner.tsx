import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Plannercontent from "@/components/plannerComponent/plannercontent"; // Ensure PlannerContent is React Native compatible
import { useGetPlanner } from "@/services/queries/plannerQuery";
import { useLocalSearchParams } from "expo-router";
import { getMonthDate } from "@/helpers/utils";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Planner {
  days: any[];
}

const Planner = () => {
  const { studentId } = useLocalSearchParams();
  const _id = Array.isArray(studentId) ? studentId[0] : studentId;

  const { data, isError, isSuccess, error, isLoading } = useGetPlanner(_id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error?.message || "An error occurred"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.headerContainer}
        className="  p-2  rounded-lg justify-center mb-3 px-4"
      >
        <View>
          <Text className="text-primary font-mada-semibold text-xl ">
            Weekly Plan
          </Text>
          <Text className="text-base leading-tight font-mada-semibold ">
            {data?.data && data?.data.startDate && data?.data.endDate ? (
              <>
                {getMonthDate(new Date(data?.data?.startDate!))} -{" "}
                {getMonthDate(new Date(data?.data?.endDate!))}
              </>
            ) : null}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <AntDesign name="calendar" size={26} color="black" />
        </TouchableOpacity>
      </View>
      {data?.data && data?.data.days ? (
        <Plannercontent weekstopic={data?.data?.days} />
      ) : (
        <Text>No planner exists for current period</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#E8DAFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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

export default Planner;
