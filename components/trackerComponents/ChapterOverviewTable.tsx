import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TTrackerProps } from '@/types/type';
import { capitalizeFirstLetter, convertDateString } from "@/helpers/utils";
import DonutChart from '../charts/DonutChart';

const TableHeader = () => (
  <View className="flex-row bg-white py-2.5 px-1.5">
    <View className="flex-1">
      <Text className="text-sm font-medium text-black text-center">Topics</Text>
    </View>
    <View className="w-20">
      <Text className="text-sm font-medium text-black text-center">Rev Freq</Text>
    </View>
    <View className="w-24">
      <Text className="text-sm font-medium text-black text-center">Last Rev</Text>
    </View>
    <View className="w-24">
      <Text className="text-sm font-medium text-black text-center">Eff (%)</Text>
    </View>
  </View>
);

const ProgressBar = ({ value, colorClass }: { value: number; colorClass: string }) => (
  <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
    <View 
      className={`h-full ${colorClass}`}
      style={{ width: `${value}%` }}
    />
  </View>
);

const ChapterOverviewTable = ({
  chapterData,
}: {
  chapterData: TTrackerProps;
}) => {
  const [viewMore, setViewMore] = useState(false);

  if (viewMore) {
    return (
        <View className="flex-1">
      <Text className="text-sm font-medium text-black text-center">Topics</Text>
    </View>
    )
  }

  return (
    <View className="w-full border-2 rounded-xl p-3 bg-white">
      {/* Mobile Chapter Header */}
      <View className="flex-row items-center justify-between mb-3 lg:hidden">
        <Text className="text-primary text-lg font-semibold capitalize flex-1 mr-2">
          {chapterData.chapter.name}
        </Text>
        <TouchableOpacity
          className="bg-primary/10 px-4 py-2 rounded-lg"
          onPress={() => setViewMore(true)}
        >
          <Text className="text-primary text-xs font-semibold">View More</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row-reverse lg:flex-row">
        {/* Main Table Section */}
        <View className="flex-1">
          {/* Desktop Chapter Header */}
          <View className="hidden lg:flex-row lg:items-center lg:mb-4">
            <Text className="text-primary text-2xl font-semibold capitalize">
              {chapterData.chapter.name}
            </Text>
          </View>

          <ScrollView className="h-52 lg:h-72">
            <TableHeader />
            
            {chapterData && chapterData.topics.length ? (
              chapterData.topics.map((item: any) => (
                <View key={item.name} className="flex-row py-2 border-b border-gray-200">
                  <View className="flex-1">
                    <Text className="text-xs">{capitalizeFirstLetter(item.name)}</Text>
                  </View>
                  <View className="w-20">
                    <Text className="text-xs text-center font-semibold">
                      {item.plannerFrequency}
                    </Text>
                  </View>
                  <View className="w-24">
                    <Text className="text-xs text-center font-semibold">
                      {convertDateString(item.studiedAt[item.studiedAt.length - 1].date!)}
                    </Text>
                  </View>
                  <View className="w-24">
                    <View className="px-1">
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-[10px] font-semibold">
                          {item.overall_efficiency! < 70
                            ? "Improve"
                            : item.overall_efficiency! >= 70 && item.overall_efficiency! < 80
                            ? "Moderate"
                            : "Excellent"}
                        </Text>
                        <Text className="text-[10px] font-semibold">
                          {item?.overall_efficiency?.toFixed(0)}%
                        </Text>
                      </View>
                      <ProgressBar
                        value={item?.overall_efficiency}
                        colorClass={
                          item?.overall_efficiency! < 70
                            ? "bg-[#ff2e2e]"
                            : item?.overall_efficiency! >= 70 && item?.overall_efficiency! < 80
                            ? "bg-[#FFBA53]"
                            : "bg-[#0FD679]"
                        }
                      />
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-center py-4">No topics to track!</Text>
            )}
          </ScrollView>

          {/* Desktop View More Button */}
          <View className="hidden lg:flex lg:justify-center lg:mt-4">
            <TouchableOpacity
              className="bg-primary/10 px-6 py-3 rounded-lg"
              onPress={() => setViewMore(true)}
            >
              <Text className="text-primary text-xl font-semibold">View More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chapter Overview Section */}
        <View className="w-44">
          <Text className="text-center text-lg font-medium py-5 hidden lg:block border-b">
            Chapter Overview
          </Text>
          <View className="bg-primary/10 rounded-xl border border-primary p-3 mt-2">


            <View className="gap-y-2 mt-4">
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-primary" />
                <Text className="text-[9px] font-medium">
                  Revision Completion - 
                  <Text className="font-bold"> {chapterData.chapter.plannerFrequency}%</Text>
                </Text>
              </View>
              
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-[#72EFDD]" />
                <Text className="text-[9px] font-medium">
                  Total Efficiency - 
                  <Text className="font-bold"> {chapterData.chapter.overall_efficiency}%</Text>
                </Text>
              </View>
              
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-[#FFDA57]" />
                <Text className="text-[9px] font-medium">
                  No. of Questions Solved - 
                  <Text className="font-bold"> 70%</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChapterOverviewTable;