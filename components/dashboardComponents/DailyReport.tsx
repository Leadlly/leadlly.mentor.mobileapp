import { Text, View } from "react-native";
import RadialChart from "../charts/RadialChart";
import { useAppSelector } from "../../services/redux/hooks";
import { formatDate } from "../../helpers/utils";
import { colors } from "../../constants/constants";

const DailyReport = ({
  dailyreportquiz,
  dailyreportsession,
}: {
  dailyreportquiz: number;
  dailyreportsession: number;
}) => {
  return (
    <View className="mb-[20px] border border-input-border py-4 px-6 rounded-xl">
      <Text className="text-base font-mada-Bold leading-tight">
        Daily Report
      </Text>

      <View className="mt-4 mb-2">
        <RadialChart
          data1={dailyreportquiz}
          data2={dailyreportsession}
          color1={colors.primary}
          color2={colors.leadllyCyan}
          bgColor1="#f6f1fd"
          bgColor2="#f5fbfc"
          legendText1="Sessions"
          legendText2="Quizzes"
        />
      </View>
    </View>
  );
};

export default DailyReport;
