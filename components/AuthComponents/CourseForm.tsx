import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FormType } from "@/types/type";
const CourseForm = ({ next, form }: { next: () => void; form: FormType }) => {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(100)}
      className="flex items-center gap-5 py-12 px-12"
    >
      <Image
        source={require("../../assets/images/course.png")}
        className="w-[20vh] h-[20vh]"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        Are your Studying for?
      </Text>
      <Text className="text-base leading-tight font-mada-medium text-center">
        Focus on core topics with hands-on practice and real-world examples for
        deeper understanding.
      </Text>

      <View className="mb-4 " style={styles.input}>
        <Controller
          name="course"
          control={form.control}
          render={({ field }) => (
            <View className="flex justify-between items-center flex-row gap-10 py-4">
              <Pressable
                className={`mx-2 w-[110px] h-[132px] rounded-lg border-2 ${
                  field.value === "JEE"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("JEE");
                  next();
                }}
              >
                <ImageBackground
                  source={require("../../assets/images/jee.png")}
                  className="w-full rounded-lg  h-full mx-auto flex items-center justify-center"
                >
                  <Text
                    className={`text-center font-semibold text-3xl text-[#2D61FD] uppercase`}
                  >
                    Jee
                  </Text>
                </ImageBackground>
              </Pressable>

              <Pressable
                className={`mx-2 w-[110px] h-[132px] rounded-lg border-2 ${
                  field.value === "NEET"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("NEET");
                  next();
                }}
              >
                <ImageBackground
                  source={require("../../assets/images/neet.png")}
                  className="w-full  rounded-lg  h-full mx-auto flex items-center justify-center"
                >
                  <Text
                    className={`text-center font-semibold text-3xl  text-[#06E480] uppercase`}
                  >
                    Neet
                  </Text>
                </ImageBackground>
              </Pressable>
            </View>
          )}
        />

        {form.formState.errors.course && (
          <Text className="text-red-600 font-mada-medium">
            {form.formState.errors.course.message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
export default CourseForm;
const styles = StyleSheet.create({
  input: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
