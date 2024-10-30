import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";
import { colors } from "../../constants/constants";
import { TRevisionProps } from "@/types/type";

const ToDoListItem = ({
  item,
  completedTopics,
  incompleteTopics,
}: {
  item: TRevisionProps;
  completedTopics: any[];
  incompleteTopics: any[];
}) => {
  return (
    <View className="py-2 justify-center w-full">
      <View className={clsx("flex-row justify-between items-start")}>
        <Text className="flex-1 text-[15px] font-mada-semibold leading-tight -mt-0.5">
          {capitalizeFirstLetter(item.topic.name)}
        </Text>

        {completedTopics &&
        completedTopics.length > 0 &&
        completedTopics.includes(item.topic.name) ? (
          <Text className=" text-leadlly-green px-2 py-1 text-xs font-mada-semibold ml-3">
            Completed
          </Text>
        ) : incompleteTopics &&
          incompleteTopics.length > 0 &&
          incompleteTopics.includes(item.topic.name) ? (
          <Text className=" text-leadlly-red px-2 py-1 text-xs font-mada-semibold ml-3">
            Incomplete
          </Text>
        ) : (
          <Text className=" text-gray-400 px-2 py-1 text-xs font-mada-semibold  ml-3">
            Not Attempted
          </Text>
        )}
      </View>
    </View>
  );
};

export default ToDoListItem;
