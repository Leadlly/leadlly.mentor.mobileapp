import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { Linking } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const OfflineScreen = ({
  setConnected,
}: {
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleTryAgain = () => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected ?? false);
    });
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <View className="w-52 h-52">
        <LottieView
          source={require("../assets/offline_animation.json")}
          autoPlay
          loop
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <Text className="text-2xl font-bold mt-5 text-center">
        No Internet Connection
      </Text>

      <Text className="text-base text-gray-600 mt-2.5 text-center">
        Please check your internet connection and try again
      </Text>

      <View className="mt-8 space-y-4">
        <TouchableOpacity
          className="bg-blue-500 py-3 px-8 rounded-lg min-w-[200px]"
          onPress={handleTryAgain}
        >
          <Text className="text-white font-semibold text-center text-base">
            Try Again
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 py-3 px-8 rounded-lg min-w-[200px]"
          onPress={openSettings}
        >
          <Text className="text-white font-semibold text-center text-base">
            Open Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfflineScreen;
