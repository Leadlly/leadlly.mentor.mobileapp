import { View } from "react-native";
import React from "react";
import { Canvas, Path, SkFont, Skia, Text } from "@shopify/react-native-skia";
import DonutPath from "./DonutPath";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { colors as leadllyColors } from "../../constants/constants";

interface DonutChartProps {
  radius: number;
  gap: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  font: SkFont;
  smallFont: SkFont;
  colors: string[];
  data: number[];
  totalValue: SharedValue<number>;
  decimals: SharedValue<number[]>;
}

const DonutChart = ({
  colors,
  font,
  gap,
  outerStrokeWidth,
  radius,
  smallFont,
  strokeWidth,
  data,
  decimals,
  totalValue,
}: DonutChartProps) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `${Math.round(totalValue.value)}%`,
    []
  );

  const fontSize = font.measureText("000%");
  const smallFontSize = smallFont.measureText("Total Value");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  }, []);

  return (
    <View className="flex-1">
      <Canvas style={{ flex: 1 }}>
        <Path
          path={path}
          color={"#fff"}
          style={"stroke"}
          strokeJoin={"round"}
          strokeWidth={outerStrokeWidth}
          strokeCap={"round"}
          start={0}
          end={1}
        />
        {data.map((item, index) => (
          <DonutPath
            key={index}
            radius={radius}
            strokeWidth={strokeWidth}
            outerStrokeWidth={outerStrokeWidth}
            color={colors[index]}
            index={index}
            gap={gap}
            decimals={decimals}
          />
        ))}
        <Text
          x={radius - smallFontSize.width / 2}
          y={radius + smallFontSize.height / 2 - fontSize.height / 1.2}
          text={"Total Value"}
          font={smallFont}
          color={leadllyColors.tabItemGray}
        />
        <Text
          x={textX}
          y={radius + fontSize.height / 1.5}
          text={targetText}
          font={font}
        />
      </Canvas>
    </View>
  );
};

export default DonutChart;
