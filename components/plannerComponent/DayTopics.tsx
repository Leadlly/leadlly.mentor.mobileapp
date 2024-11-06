import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Plus, Trash2 } from "lucide-react-native";
import { getFormattedDate } from "@/helpers/utils";
import { TweeksTopic } from "./plannercontent";
import { colors } from "@/constants/constants";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AddTopicsModal from "./AddTopicsModal";

type DayTopicsProps = {
  datecard: TweeksTopic; // Using the TweeksTopic type from parent
  dateIndex: number;
};

const DayTopics = ({ datecard, dateIndex }: DayTopicsProps) => {
  const isToday =
    getFormattedDate(new Date(datecard.date)) === getFormattedDate(new Date());
  const mergedTopics = [
    ...datecard.continuousRevisionTopics,
    ...datecard.backRevisionTopics,
  ];

  return (
    <View
      key={datecard.date}
      className={`mb-5 border ${isToday ? "border-primary" : "border-[#D9D8D8]"} rounded-xl`}
    >
      <View className="flex justify-between px-3 py-2  flex-row items-center">
        <Text className="text-lg font-mada-Bold text-black/80">
          {datecard.day}, {getFormattedDate(new Date(datecard.date))}
        </Text>
        <View className="flex flex-row space-x-5">
          <AddTopicsModal />
          <TouchableOpacity className="bg-primary/10 rounded-full p-2">
            <Trash2 size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        className={`w-full border-t ${isToday ? "border-primary" : "border-[#D9D8D8]"} p-4`}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {mergedTopics && mergedTopics.length > 0 ? (
            <>
              {mergedTopics.map((topic, topicIndex) => (
                <View
                  key={topicIndex}
                  className="bg-primary/70 px-2 py-1 rounded-lg mr-2  flex flex-row items-center"
                >
                  <Text className="text-base font-mada-medium text-white mr-3">
                    {topic.topic.name}
                  </Text>
                  <Feather name="x" size={16} color="white" />
                </View>
              ))}
            </>
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className="items-center justify-center">
                <LottieView
                  source={require("../../assets/no_topics_animations.json")}
                  autoPlay
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: -20,
                  }}
                />
              </View>
              <Text className="text-xs text-secondary-text font-mada-medium leading-tight -mt-4">
                No topics for {datecard.day}!
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default DayTopics;

const styles = StyleSheet.create({});
