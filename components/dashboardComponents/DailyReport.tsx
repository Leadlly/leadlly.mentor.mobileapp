import { Text, View } from "react-native";
import RadialChart from "../charts/RadialChart";
import { useAppSelector } from "../../services/redux/hooks";
import { formatDate } from "../../helpers/utils";
import { colors } from "../../constants/constants";

const DailyReport = () => {
  const userDailyReport = useAppSelector(
    (state) => state.user.user?.details?.report?.dailyReport
  );

  return (
    <View className="my-1.5 border border-input-border py-4 px-6 rounded-xl">
      <Text className="text-base font-mada-Bold leading-tight">
        Daily Report
      </Text>

      <View className="mt-4 mb-2">
        <RadialChart
          data1={
            userDailyReport?.date &&
            formatDate(userDailyReport.date!) ===
              formatDate(new Date(Date.now()))
              ? userDailyReport?.session!
              : 0
          }
          data2={
            userDailyReport?.date &&
            formatDate(userDailyReport.date!) ===
              formatDate(new Date(Date.now()))
              ? userDailyReport?.quiz!
              : 0
          }
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
