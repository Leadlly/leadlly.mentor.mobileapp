import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FormType } from "@/types/type";
const GenderForm = ({ next, form }: { next: () => void; form: FormType }) => {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(100)}
      className="flex items-center gap-5 py-12 px-12"
    >
      <Image
        source={require("../../assets/images/Gender.png")}
        className="w-[20vh] h-[20vh]"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        What is you Gender?
      </Text>
      <Text className="text-base leading-tight font-mada-medium text-center">
        Select your gender from the given below options
      </Text>

      <View className="mb-4" style={styles.input}>
        <Controller
          name="gender"
          control={form.control}
          render={({ field }) => (
            <View className="w-96 justify-center items-center flex-row flex-wrap gap-10 py-4">
              <Pressable
                className={`m-2  py-4 px-5 rounded-lg border-2 ${
                  field.value === "male"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("male");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/male.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold  text-lg ${
                    field.value === "male" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Male
                </Text>
              </Pressable>

              <Pressable
                className={`m-2 py-4 px-5 rounded-lg border-2 ${
                  field.value === "female"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("female");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/female.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold  text-lg ${
                    field.value === "female" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Female
                </Text>
              </Pressable>

              <Pressable
                className={`m-2 py-4 px-5 rounded-lg border-2 ${
                  field.value === "other"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("other");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/others.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold  text-lg ${
                    field.value === "other" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Other
                </Text>
              </Pressable>
            </View>
          )}
        />

        {form.formState.errors.gender && (
          <Text className="text-red-600 font-mada-medium">
            {form.formState.errors.gender.message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
export default GenderForm;
const styles = StyleSheet.create({
  input: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
