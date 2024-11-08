import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import clsx from "clsx";
import { capitalizeFirstLetter, getFormattedDate } from "../../helpers/utils";
import { TTrackerProps } from "@/types/type";
import AntDesign from "@expo/vector-icons/AntDesign";

const ChapterRevisionDateTable = ({
  item,
  setViewMore,
}: {
  item: TTrackerProps;
  setViewMore: (viewMore: boolean) => void;
}) => {
  return (
    <View>
      <View className="flex-row items-center gap-x-3 mb-5">
        <Pressable className="" onPress={() => setViewMore(false)}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </Pressable>
        <View className="flex-1">
          <Text
            className="capitalize text-center text-lg leading-tight font-mada-semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            hello
          </Text>
        </View>
      </View>

      <View className="border border-input-border rounded-lg h-56">
        <View className="bg-primary/10 p-3 rounded-t-lg">
          <Text className="text-base font-mada-medium leading-tight text-center text-primary">
            Last time revision Date with Efficiency
          </Text>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          className="flex-1 px-3"
        >
          {item && item.topics.length > 0 ? (
            item.topics.map((topic) => (
              <View key={topic.name} className="py-2">
                <Text
                  className="text-sm leading-tight font-mada-regular mb-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {capitalizeFirstLetter(topic.name)}
                </Text>
                <ScrollView
                  nestedScrollEnabled={true}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {topic.studiedAt.map((date) => (
                    <View
                      key={date.date?.toString()}
                      className={clsx(
                        "px-2 h-8 rounded items-center justify-center mr-2",
                        date.efficiency! <= 40
                          ? "bg-leadlly-red/10"
                          : date.efficiency! > 40 && date.efficiency! < 80
                            ? "bg-leadlly-yellow/10"
                            : "bg-leadlly-green/10"
                      )}
                    >
                      <Text
                        className={clsx(
                          "text-xs leading-tight font-mada-semibold",
                          date.efficiency! <= 40
                            ? "text-leadlly-red"
                            : date.efficiency! > 40 && date.efficiency! < 80
                              ? "text-leadlly-yellow"
                              : "text-leadlly-green"
                        )}
                      >
                        {getFormattedDate(new Date(date.date!))}
                      </Text>
                    </View>
                  ))}
                  <View className="bg-primary/10 rounded items-start justify-center px-2 py-1">
                    <Text className="text-[9px] font-mada-medium">
                      Overall Eff:{" "}
                      <Text
                        className={clsx(
                          topic.overall_efficiency! <= 40
                            ? "text-leadlly-red"
                            : topic.overall_efficiency! > 40 &&
                                topic.overall_efficiency! < 80
                              ? "text-leadlly-yellow"
                              : "text-leadlly-green"
                        )}
                      >
                        {Math.round(topic.overall_efficiency!)}%
                      </Text>
                    </Text>
                    <Text className="text-[9px] font-mada-medium">
                      No. of Revisions:{" "}
                      <Text className="font-mada-Bold">
                        {topic.plannerFrequency}
                      </Text>
                    </Text>
                  </View>
                </ScrollView>
              </View>
            ))
          ) : (
            <View className="flex-1">
              <Text className="text-center font-mada-semibold text-tab-item-gray leading-tight text-lg">
                No Topics to track!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChapterRevisionDateTable;