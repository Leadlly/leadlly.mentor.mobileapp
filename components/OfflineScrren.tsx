import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { Linking } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-5 flex h-screen flex-col">
      <View className="w-full h-[100vw]">
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

      <View className="flex items-center justify-center mx-5 w-full">
        <Text className="text-3xl font-mada-Bold mt-5 text-center ">
          Oops!{"\n"}No Internet Connection
        </Text>

        <Text className="text-lg text-gray-600 mt-2.5 text-center font-mada-medium">
          Please check your internet connection and try again
        </Text>

        <View className="mt-8 space-y-4 w-full">
          <TouchableOpacity
            className="bg-primary py-3 px-8 rounded-xl "
            onPress={handleTryAgain}
          >
            <Text className="text-white font-mada-semibold text-center text-base">
              Try Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 py-3 px-8 rounded-xl "
            onPress={openSettings}
          >
            <Text className="text-black font-mada-semibold text-center text-base">
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OfflineScreen;
