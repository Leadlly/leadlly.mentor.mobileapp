import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Community = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-4xl font-mada-Bold text-center text-purple-600 mb-4">
        Coming Soon
      </Text>

      <Text className="text-xl text-gray-700 text-center font-mada-medium max-w-xs">
        We're crafting an amazing community space just for you.
      </Text>

      <Text className="text-lg text-purple-500 mt-8 font-mada-semibold">
        Stay tuned for updates!
      </Text>
    </SafeAreaView>
  );
};

export default Community;
