import { View, Text } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { colors } from "../../constants/constants";

const SemiRadialChart = ({
  bgColor,
  color,
  data,
  legendText,
}: {
  data: number;
  color: string;
  bgColor: string;
  legendText: string;
}) => {
  return (
    <View className="items-center justify-center">
      <AnimatedCircularProgress
        size={130}
        width={12}
        fill={Math.round(data)}
        tintColor={color}
        backgroundColor={bgColor}
        rotation={-90}
        lineCap="round"
        arcSweepAngle={180}
        style={{ marginBottom: -30 }}
      >
        {(fill) => (
          <Text className="text-xl font-mada-Bold leading-tight">
            {Math.round(fill)}%
          </Text>
        )}
      </AnimatedCircularProgress>

      <View className="flex-row items-center space-x-3">
        <View className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
        <Text className="text-sm font-mada-semibold leading-tight">
          {legendText}
        </Text>
      </View>
    </View>
  );
};

export default SemiRadialChart;
