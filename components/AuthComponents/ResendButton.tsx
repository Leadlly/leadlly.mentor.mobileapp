import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResendOtpButton: React.FC = () => {
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [disableResend, setDisableResend] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  const resendOTPHandler = async () => {
    setIsResendingOTP(true);
    const email = await AsyncStorage.getItem("email");

    try {
      const response = await axios.post("/api/auth/resend", { email });
      const data = response.data;

      if (data.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: data.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
        });
      }
      setTimeLeft(30);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error re-sending OTP",
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setDisableResend(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setDisableResend(true);
    };
  }, [timeLeft]);

  return (
    <View className="flex-row items-center mt-4 justify-center">
      <TouchableOpacity
        onPress={resendOTPHandler}
        disabled={disableResend || isResendingOTP}
      >
        {isResendingOTP ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Text
            className={` ${disableResend ? "text-primary/70" : "text-primary"}`}
          >
            Resend OTP
          </Text>
        )}
      </TouchableOpacity>
      <Text className="text-xs text-gray-500 ml-2">
        00:{String(timeLeft).padStart(2, "0")}s
      </Text>
    </View>
  );
};

export default ResendOtpButton;
