import { Image } from "expo-image";
import { Controller } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FormType } from "@/types/type";

const ClassForm = ({ next, form }: { next: () => void; form: FormType }) => {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(100)}
      className="flex items-center gap-5 py-12 px-12"
    >
      <Image
        source={require("../../assets/images/Class.png")}
        className="w-[20vh] h-[20vh]"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        Which class your Studying?
      </Text>
      <Text className="text-base leading-tight font-mada-medium text-center">
        Focus on core topics with hands-on practice and real-world examples for
        deeper understanding.
      </Text>

      <View className="mb-4 " style={styles.input}>
        <Controller
          name="class"
          control={form.control}
          render={({ field }) => (
            <View className="w-96 flex-wrap justify-center items-center flex-row gap-10 py-4">
              <Pressable
                className={`mx-2  py-4 px-4 rounded-lg border-2 ${
                  field.value === "11"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("11");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/class11.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold text-lg ${
                    field.value === "11" ? "text-black" : "text-gray-500"
                  }`}
                >
                  11th Class
                </Text>
              </Pressable>

              <Pressable
                className={`mx-2 py-4 px-4 rounded-lg border-2 ${
                  field.value === "12"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("12");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/Class12.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold  text-lg ${
                    field.value === "12" ? "text-black" : "text-gray-500"
                  }`}
                >
                  12th Class
                </Text>
              </Pressable>

              <Pressable
                className={`mx-2 py-4 px-4 rounded-lg border-2 ${
                  field.value === "13"
                    ? "border-[#9654F4] bg-gray-50"
                    : "border-transparent bg-gray-50"
                }`}
                onPress={() => {
                  field.onChange("13");
                  next();
                }}
              >
                <Image
                  source={require("../../assets/images/class13.png")}
                  className="w-[76px] h-[76px] mx-auto"
                />
                <Text
                  className={`text-center font-semibold  text-lg ${
                    field.value === "13" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Dropper
                </Text>
              </Pressable>
            </View>
          )}
        />

        {form.formState.errors.class && (
          <Text className="text-red-600 font-mada-medium">
            {form.formState.errors.class.message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};
export default ClassForm;
const styles = StyleSheet.create({
  input: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
