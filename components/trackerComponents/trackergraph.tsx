import { View, Text, StyleSheet } from "react-native";
import { TTrackerProps } from "@/types/type";
import DonutChart from "../charts/DonutChart";
import { colors } from "../../constants/constants";
import { useFont } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from "react-native-reanimated";

const RADIUS = 60;
const STROKE_WIDTH = 15;
const OUTER_STROKE_Width = 20;
const GAP = 0.04;

const TrackerGraph = ({ item }: { item: TTrackerProps }) => {
  const chartData = [
    item.chapter.overall_progress!,
    item.chapter.overall_efficiency!,
    item.chapter.total_questions_solved.percentage!,
  ];

  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);

  const sum = chartData.reduce((acc, currentValue) => acc + currentValue, 0);
  const average = Math.round((sum / chartData.length / 100) * 100);

  const generateDecimals = chartData.map((num) => Number(num.toFixed(0)) / 100);

  totalValue.value = withTiming(average, { duration: 1000 });
  decimals.value = [...generateDecimals];

  const font = useFont(require("../../assets/fonts/Mada-Bold.ttf"), 24);
  const smallFont = useFont(require("../../assets/fonts/Mada-Medium.ttf"), 9);

  return (
    <View
      style={[styles.boxShadow, { backgroundColor: "#E9DAFF" }]}
      className="p-5 rounded-lg my-3 flex-row items-center justify-between"
    >
      {!font || !smallFont ? (
        <View />
      ) : (
        <View style={{ width: RADIUS * 2, height: RADIUS * 2 }}>
          <DonutChart
            radius={RADIUS}
            gap={GAP}
            strokeWidth={STROKE_WIDTH}
            outerStrokeWidth={OUTER_STROKE_Width}
            font={font}
            smallFont={smallFont}
            colors={[
              colors.primary,
              colors.leadllyCyan,
              colors.leadllyChartYellow,
            ]}
            data={chartData}
            decimals={decimals}
            totalValue={totalValue}
          />
        </View>
      )}
      <View>
        <View className="flex-row items-center mb-2">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-xs font-mada-medium leading-tight">
            Revision Completion -{" "}
            <Text className="font-mada-Bold">
              {Math.round(item.chapter.overall_progress!)}%
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <View className="w-2 h-2 rounded-full bg-leadlly-cyan mr-2" />
          <Text className="text-xs font-mada-medium leading-tight">
            Total Efficiency -{" "}
            <Text className="font-mada-Bold">
              {Math.round(item.chapter.overall_efficiency!)}%
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-leadlly-chart-yellow mr-2" />
          <Text className="text-xs font-mada-medium leading-tight">
            No. of questions solved -{" "}
            <Text className="font-mada-Bold">
              {item.chapter.total_questions_solved &&
              item.chapter.total_questions_solved.number &&
              item.chapter.total_questions_solved.number > 120
                ? "120+"
                : item.chapter.total_questions_solved.number}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
});

export default TrackerGraph;