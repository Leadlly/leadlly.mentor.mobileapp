import React, { useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { Plus, Trash2 } from "lucide-react-native"; // Ensure you're using lucide-react-native for icons
import NewTopicLearnt from "./NewTopicLearnt";
import { getFormattedDate } from "@/helpers/utils";
import DayTopics from "./DayTopics";
import { FlatList } from "react-native-gesture-handler";

type Topic = {
  topic: {
    name: string;
  };
};

export type TweeksTopic = {
  day: string;
  date: string;
  continuousRevisionTopics: Topic[];
  backRevisionTopics: Topic[];
};

const Plannercontent = ({ weekstopic }: { weekstopic: TweeksTopic[] }) => {
 
  const [showPopup, setShowPopup] = useState(false);
  const [newTopicLearnt, setNewTopicLearnt] = useState(false);

  

  return (
    <View className="py-5 mb-20">
      {/* <View className="mb-10">
        <TouchableOpacity className="flex justify-center gap-2 items-center bg-[#CDAAFF] rounded-md py-2 px-4">
          <Text className="text-white font-medium text-lg">
            Add Revision sessions
          </Text>
          <View className="border border-[#6200EE] rounded-full p-1">
            <Plus className="text-[#6200EE] w-3 h-3" />
          </View>
        </TouchableOpacity>
      </View> */}
      <FlatList
      className="mb-10 pb-20 "
        data={weekstopic}
        renderItem={({ item: datecard, index: dateIndex }) => (
          <DayTopics
            datecard={datecard}
            dateIndex={dateIndex}
          />
        )}
        keyExtractor={(item) => item.date}
      />
      {showPopup && (
        <View className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <View className="bg-white rounded-lg p-4 w-11/12 md:w-2/3 lg:w-1/2">
            <TouchableOpacity
              className="absolute top-4 right-4"
              onPress={() => setShowPopup(false)}
              aria-label="Close popup"
            >
              <Text>X</Text>
            </TouchableOpacity>
            <NewTopicLearnt setNewTopicLearnt={setNewTopicLearnt} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Plannercontent;
