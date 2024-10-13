import { Text, View } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const RadialChart = ({
  bgColor1,
  bgColor2,
  color1,
  color2,
  data1,
  data2,
  legendText1,
  legendText2,
}: {
  data1: number;
  data2: number;
  color1: string;
  color2: string;
  bgColor1: string;
  bgColor2: string;
  legendText1: string;
  legendText2: string;
}) => {
  return (
    <View className="flex-row items-center justify-around">
      <AnimatedCircularProgress
        size={140}
        fill={data1}
        width={8}
        tintColor={color1}
        backgroundColor={bgColor1}
        rotation={360}
        lineCap="round"
      >
        {(fill1) => (
          <AnimatedCircularProgress
            size={110}
            fill={data2}
            width={8}
            tintColor={color2}
            backgroundColor={bgColor2}
            rotation={360}
            lineCap="round"
          >
            {(fill2) => {
              const dataArray = [fill1, fill2];
              const sum = dataArray.reduce(
                (acc: number, value: number) => acc + value,
                0
              );

              const average = sum / dataArray.length;

              const averagePercentage = Math.round((average / 100) * 100);

              return (
                <View className="items-center justify-center">
                  <Text className="text-xl leading-tight font-mada-Bold -mb-1.5">
                    {averagePercentage}%
                  </Text>
                  <Text className="text-[10px] leading-tight font-mada-medium text-tab-item-gray">
                    Overall
                  </Text>
                </View>
              );
            }}
          </AnimatedCircularProgress>
        )}
      </AnimatedCircularProgress>

      <View className="space-y-1">
        <View className="flex-row items-center gap-3">
          <View
            className="w-3.5 h-3.5 rounded"
            style={{ backgroundColor: color1 }}
          />
          <Text className="text-base leading-tight font-mada-medium">
            {legendText1}
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View
            className="w-3.5 h-3.5 rounded"
            style={{ backgroundColor: color2 }}
          />
          <Text className="text-base leading-tight font-mada-medium">
            {legendText2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RadialChart;
