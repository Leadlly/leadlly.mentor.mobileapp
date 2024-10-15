import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "@/components/AuthComponents/showToast";
import OTPInput from "@/components/AuthComponents/OTPInput";
import ResendOtpButton from "@/components/AuthComponents/ResendButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../services/redux/hooks";
import { useVerifyUser } from "../../services/queries/userQuery";
import { loginAction } from "../../services/redux/slices/userSlice";

const OTPFormSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required!" })
    .min(6, { message: "Your OTP must be 6 characters" })
    .regex(/^\d+$/, { message: "OTP should only contain digits" }),
});

const Verify: React.FC = () => {
  const { mutateAsync: verify, isPending: isVerifying } = useVerifyUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const onOTPSubmit = async (data: z.infer<typeof OTPFormSchema>) => {
    const email = await AsyncStorage.getItem("email");

    try {
      if (!email) {
        throw new Error("email not found");
      }

      const res = await verify({ otp: data.otp, email });
      dispatch(loginAction({ token: res.token, ...res.user }));
      await AsyncStorage.removeItem("email");
      showToast("success", "Success", "Account verified successfully");
      router.replace("/initialInfo" as any);
    } catch (error) {
      console.log(error);
      showToast("error", "Verification Failed", "Account verification failed!");
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <View className="w-full flex-1 justify-center max-w-lg p-4 bg-white rounded-lg ">
        <Text className="text-center text-2xl font-semibold mb-4">
          One-Time Password
        </Text>

        <OTPInput control={control} errors={errors} />
        <Text className="text-center  text-gray-700 mb-4">
          Please enter the one-time password sent to your email.
        </Text>

        <TouchableOpacity
          className={`mt-4 bg-primary p-3 rounded-lg ${isVerifying ? "opacity-50" : ""}`}
          onPress={handleSubmit(onOTPSubmit)}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-center">Submit</Text>
          )}
        </TouchableOpacity>

        <ResendOtpButton />
      </View>
    </SafeAreaView>
  );
};

export default Verify;
