import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { FormType, MentorPersonalInfoProps } from "@/types/type";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { setUser } from "@/services/redux/slices/userSlice";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { FormSchema } from "@/schemas/formSchema";
import { Feather } from "@expo/vector-icons";
const GenderForm = ({
  next,
  form,
  saveInitialInfo,
  isSavingInitialInfo,
}: {
  next: () => void;
  form: FormType;
  saveInitialInfo: UseMutateAsyncFunction<
    any,
    Error,
    any,
    unknown
  >;
  isSavingInitialInfo: boolean;
}) => {

  const { handleSubmit } = form;
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const saveInitialInfoResponse = await saveInitialInfo({
        phone: Number(data.phoneNumber),
        gender: data.gender,
      });

      if (user) {
        dispatch(setUser({ 
          ...user, 
          about: { 
            ...user.about, 
            gender: data.gender 
          }, 
          "phone.personal": data.phoneNumber 
        }));
      }

      Toast.show({
        type: "success",
        text1: saveInitialInfoResponse.message,
      });

      router.replace("/dashboard?initialSetup=true");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

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
                  // next();
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

      <Pressable
        className="mt-8 py-2 px-6 bg-[#9654F4] rounded-lg flex flex-row space-x-2 justify-center items-center"
        onPress={handleSubmit(onSubmit)}
        disabled={isSavingInitialInfo}
      >
        {isSavingInitialInfo ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <>
            <Text className="text-white font-semibold">Next</Text>
            <Feather name="arrow-right" size={16} color="white" />
          </>
        )}
      </Pressable>

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
