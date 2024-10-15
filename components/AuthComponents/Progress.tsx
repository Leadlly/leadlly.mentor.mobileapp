import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type ProgressProps = {
  steps: number;
  currentStep: number;
  back: () => void;
};

const Progress: React.FC<ProgressProps> = ({ steps, currentStep, back }) => {
  const handleBack = () => {
    if (currentStep == 0) {
      return router.push("/");
    }
    back();
  };
  return (
    <View className=" py-4 gap-7 px-5 flex-row items-center">
      <TouchableOpacity onPress={handleBack}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      {Array(steps)
        .fill(null)
        .map((_, index) => (
          <View
            key={index}
            className={`rounded-lg h-[6px] flex-1 ${
              currentStep > index
                ? "bg-[#9654F4]"
                : currentStep === index
                  ? "bg-[#9654F4]"
                  : "bg-[#D9C2F94A]"
            }`}
            aria-current={currentStep === index ? "step" : undefined}
          />
        ))}
    </View>
  );
};

export default Progress;
