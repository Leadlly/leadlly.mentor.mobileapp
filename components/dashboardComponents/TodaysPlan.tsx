import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useGetPlanner } from "@/services/queries/plannerQuery";
import { TDayProps, TRevisionProps } from "@/types/type";
import { getFormattedDate } from "@/helpers/utils";
import ToDoListItem from "./TodoListItem";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const TodaysPlan = ({ id }: { id: string }) => {
  const [todaysTopics, setTodaysTopics] = useState<TDayProps | null>(null);
  const [allRevisionTopics, setAllRevisionTopics] = useState<TRevisionProps[]>(
    []
  );
  const snapPoints = useMemo(() => ["70%", "100%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { data, isSuccess, isLoading, isError } = useGetPlanner(id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (data && data?.data?.days.length > 0 && isSuccess) {
      const today = data.data.days.find(
        (item) =>
          getFormattedDate(new Date(item.date)) === getFormattedDate(new Date())
      );
      if (today) {
        setTodaysTopics(today);
        setAllRevisionTopics([
          ...today.backRevisionTopics,
          ...today.continuousRevisionTopics,
        ]);
      }
    }
    setLoading(false);
  }, [data, isSuccess]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const renderToDoListItems = (items: TRevisionProps[], limit?: number) =>
    items
      .slice(0, limit)
      .map((item) => (
        <ToDoListItem
          key={item._id}
          item={item}
          completedTopics={todaysTopics?.completedTopics || []}
          incompleteTopics={todaysTopics?.incompletedTopics || []}
        />
      ));

  if (isLoading || loading) {
    return (
      <View className="my-5 p-4 bg-[#f5eafe] rounded-2xl justify-center items-center h-40">
        <ActivityIndicator size="large" color="#6200ee" />
        <Text className="mt-2 text-gray-600 font-mada-medium">
          Loading today's plan...
        </Text>
      </View>
    );
  }

  return (
    <View className="my-5 p-4 bg-[#f5eafe] rounded-2xl">
      <View className="flex-row justify-between items-center flex">
        <View className="">
          <Text className="text-lg font-mada-semibold text-primary">
            Today's Plan
          </Text>
          <Text className="text-sm text-gray-600 font-mada-regular">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>
        {allRevisionTopics.length > 4 && (
          <TouchableOpacity onPress={handlePresentModalPress}>
            <Text className="text-primary font-mada-medium text-base">
              View all{" "}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {isError ? (
        <View className="mt-2.5 items-center py-2">
          <Text className="font-mada-semibold text-gray-600 text-lg">
            No Planner Found
          </Text>
          <Text className="text-gray-500 font-mada-regular text-sm mt-2 text-center px-4">
            This student doesn't have a planner assigned yet.
          </Text>
        </View>
      ) : allRevisionTopics.length > 0 && todaysTopics ? (
        <View className="mt-2.5">
          {renderToDoListItems(allRevisionTopics, 4)}
        </View>
      ) : (
        <View className="mt-2.5 items-center py-2">
          <Text className="font-mada-semibold text-gray-600 text-lg">
            No Topics For Today
          </Text>
          <Text className="text-gray-500 font-mada-regular text-sm mt-2 text-center px-4">
            This student doesn't have any topics assigned for today.
          </Text>
        </View>
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View className="w-full">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-mada-bold">All Topics</Text>
              <Text className="text-primary text-sm font-mada-medium">
                {allRevisionTopics.length} topics
              </Text>
            </View>
            <View className="border-t border-gray-200 pt-4">
              {renderToDoListItems(allRevisionTopics)}
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default TodaysPlan;
