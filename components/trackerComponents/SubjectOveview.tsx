import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { ISubject } from "@/types/type";
import { widthPercentage } from "../../helpers/utils";
import { calculateProgress, colors } from "../../constants/constants";

const SubjectOverview = ({ subject }: { subject: ISubject | undefined }) => {
  return (
    <View className="bg-primary/10 rounded-lg p-4 mb-4">
      <Text className="text-lg leading-tight font-mada-Bold mb-4">
        Subject Overview
      </Text>

      <View className="gap-y-3">
        <View>
          <Text className="text-sm font-mada-medium leading-tight -mb-1">
            Revision Completion
          </Text>
          <View className="flex-row gap-x-3 items-center">
            {subject ? (
              <Progress.Bar
                progress={calculateProgress(subject?.overall_progress!)}
                width={widthPercentage(73)}
                unfilledColor="#fff"
                borderWidth={0}
                color={colors.primary}
              />
            ) : null}

            <Text className="text-lg font-mada-semibold leading-tight">
              {Math.round(subject?.overall_progress!)}%
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-mada-medium leading-tight -mb-1">
            Revision Efficiency
          </Text>
          <View className="flex-row gap-x-3 items-center">
            {subject ? (
              <Progress.Bar
                progress={calculateProgress(subject?.overall_efficiency!)}
                width={widthPercentage(73)}
                unfilledColor="#fff"
                borderWidth={0}
                color={colors.leadllyCyan}
              />
            ) : null}

            <Text className="text-lg font-mada-semibold leading-tight">
              {Math.round(subject?.overall_efficiency!)}%
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-mada-medium leading-tight -mb-1">
            No. of Questions Solved
          </Text>
          <View className="flex-row gap-x-3 items-center">
            {subject ? (
              <Progress.Bar
                progress={calculateProgress(
                  subject?.total_questions_solved.percentage!
                )}
                width={widthPercentage(73)}
                unfilledColor="#fff"
                borderWidth={0}
                color={colors.leadllyChartYellow}
              />
            ) : null}

            <Text className="text-lg font-mada-semibold leading-tight">
              {subject?.total_questions_solved.number! > 120
                ? "120+"
                : subject?.total_questions_solved.number}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SubjectOverview;
