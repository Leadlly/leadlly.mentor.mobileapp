import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";

import { TTrackerProps } from "@/types/type";
import { capitalizeFirstLetter, getFormattedDate } from "../../helpers/utils";
import { useState } from "react";
import ChapterRevisionDateTable from "./chapterrevisiontable";
import TrackerGraph from "./trackergraph";

const ChapterTracker = ({ item }: { item: TTrackerProps }) => {
  console.log(item,"this is item from chaptertracker")
  const [viewMore, setViewMore] = useState(false);

  return (
    <View className="border border-input-border rounded-lg p-4 mb-4">
      {viewMore ? (
        <ChapterRevisionDateTable item={item} setViewMore={setViewMore} />
      ) : (
        <>
          <View className="flex-row items-center">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="basis-[60%] capitalize text-lg font-mada-semibold"
            >
              hello
            </Text>
            <View className="flex-1 items-end justify-end">
              <TouchableOpacity
                className="px-3 h-8 bg-primary/10 rounded-md items-center justify-center"
                onPress={() => setViewMore(true)}
              >
                <Text className="text-xs text-primary font-mada-semibold leading-tight">
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          </View>


          <View className="border border-input-border rounded-lg h-56 overflow-hidden">
            <View className="flex-row items-center justify-between gap-x-1 p-3 bg-primary/10 rounded-t-lg">
              <Text className="text-center flex-1 text-xs leading-tight font-mada-medium">
                Topics
              </Text>
              <Text className="flex-1 text-center text-[11px] font-mada-medium leading-tight">
                Revision Freq
              </Text>
              <Text className=" flex-1 text-center text-[11px] font-mada-medium leading-tight">
                Last Revision
              </Text>
              <Text className="flex-1 text-center text-[11px] font-mada-medium leading-tight">
                Efficiency
              </Text>
            </View>

            <ScrollView
              className="flex-1"
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {item && item.topics.length > 0 ? (
                item.topics.map((topic) => (
                  <View
                    key={topic.name}
                    className="flex-row items-start justify-between gap-x-1 p-2"
                  >
                    <Text className="flex-1 text-xs leading-tight font-mada-medium">
                      {capitalizeFirstLetter(topic.name)}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {topic.plannerFrequency}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {getFormattedDate(
                        new Date(
                          topic.studiedAt[topic.studiedAt.length - 1].date!
                        )
                      )}
                    </Text>
                    <Text className="flex-1 text-center text-xs leading-tight font-mada-medium">
                      {Math.round(topic.overall_efficiency!)}%
                    </Text>
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
        </>
      )}
    </View>
  );
};

export default ChapterTracker;