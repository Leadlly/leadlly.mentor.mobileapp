import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { Plus, Trash2 } from "lucide-react-native"; // Ensure you're using lucide-react-native for icons
import NewTopicLearnt from "./NewTopicLearnt";
import { getFormattedDate } from "@/helpers/utils";

type Topic = {
  topic: {
    name: string;
  };
};

type TweeksTopic = {
  day: string;
  date: string;
  continuousRevisionTopics: Topic[];
  backRevisionTopics: Topic[];
};

const Plannercontent = ({ weekstopic }: { weekstopic: TweeksTopic[] }) => {
  const [visibleTopics, setVisibleTopics] = useState(
    weekstopic.map((datecard) => ({
      continuous: datecard.continuousRevisionTopics.map(() => true),
      back: datecard.backRevisionTopics.map(() => true),
    }))
  );
  const [showPopup, setShowPopup] = useState(false);
  const [newTopicLearnt, setNewTopicLearnt] = useState(false);

  const handleClose = (
    dateIndex: number,
    topicIndex: number,
    type: "continuous" | "back"
  ) => {
    const newVisibleTopics = visibleTopics.map((topics, i) =>
      i === dateIndex
        ? {
            ...topics,
            [type]: topics[type].map((visible, j) =>
              j === topicIndex ? false : visible
            ),
          }
        : topics
    );
    setVisibleTopics(newVisibleTopics);
  };

  return (
    <View className="border border-[#9898988A] mb-5 rounded-md h-full px-3 pt-3 overflow-hidden">
      <View className="mb-10">
        <TouchableOpacity className="flex justify-center gap-2 items-center bg-[#CDAAFF] rounded-md py-2 px-4">
          <Text className="text-white font-medium text-lg">Add Revision sessions</Text>
          <View className="border border-[#6200EE] rounded-full p-1">
            <Plus className="text-[#6200EE] w-3 h-3" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {weekstopic.map((datecard, dateIndex) => (
          <View key={datecard.date} className="mb-1">
            <View className="bg-[#F0E5FF] flex justify-between px-3 py-2 rounded-t-md border-b border-[#DFDBDB]">
              <Text className="text-lg font-bold">
                {datecard.day}, {getFormattedDate(new Date(datecard.date))}
              </Text>
              <View className="flex flex-row gap-5">
                <TouchableOpacity onPress={() => setShowPopup(true)}>
                  <Plus className="text-[#6200EE] bg-white rounded-full p-1" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Trash2 className="text-[#6200EE] bg-white rounded-full p-1" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="bg-[#F5EFFF] h-16 w-full rounded-b-md border border-[#DFDBDB]">
              {/* Add contentContainerStyle prop to ScrollView */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }} // Move layout styling here
              >
                {datecard.continuousRevisionTopics.map(
                  (topic, topicIndex) =>
                    visibleTopics[dateIndex].continuous[topicIndex] && (
                      <View key={topicIndex} className="bg-[#E2D0FF] p-2 rounded-lg mr-2">
                        <Text className="text-base font-medium">{topic.topic.name}</Text>
                      </View>
                    )
                )}
                {datecard.backRevisionTopics.map(
                  (topic, topicIndex) =>
                    visibleTopics[dateIndex].back[topicIndex] && (
                      <View key={topicIndex} className="bg-[#E2D0FF] p-2 rounded-lg mr-2">
                        <Text className="text-base font-medium">{topic.topic.name}</Text>
                      </View>
                    )
                )}
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>
      {showPopup && (
        <View className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <View className="bg-white rounded-lg p-4 w-11/12 md:w-2/3 lg:w-1/2">
            <TouchableOpacity
              className="absolute top-4 right-4"
              onPress={() => setShowPopup(false)}
              aria-label="Close popup"
            >
              <Text>X</Text> {/* Replace with an icon if needed */}
            </TouchableOpacity>
            <NewTopicLearnt setNewTopicLearnt={setNewTopicLearnt} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Plannercontent;
