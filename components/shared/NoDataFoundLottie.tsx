import { View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

interface NoDataFoundLottieProps {
  message?: string;
}

const NoDataFoundLottie = ({
  message = "No Data Found",
}: NoDataFoundLottieProps) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ width: width, height: height * 0.5 }}
    >
      <View style={{ width: width * 0.8, height: height * 0.4 }}>
        <LottieView
          source={require("@/assets/no-data-found.json")}
          autoPlay
          loop
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Text className="text-lg text-gray-600 mt-4 font-mada-medium text-center">
        {message}
      </Text>
    </View>
  );
};

export default NoDataFoundLottie;
