import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector, useAppDispatch } from "../../services/redux/hooks";
import { useRouter } from "expo-router";
import { colors } from "../../constants/constants";
import LottieView from "lottie-react-native";
import { logoutAction, setUser } from "../../services/redux/slices/userSlice";
import { useLogoutUser, useGetUser } from "../../services/queries/userQuery";
import { MentorPersonalInfoProps } from "@/types/type";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";

const COOLDOWN_PERIOD = 60000;

const Status: React.FC = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync: logout, isPending } = useLogoutUser();
  const { data: userData, refetch: refetchUser } = useGetUser();
  const [lastCheckTime, setLastCheckTime] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      await logout();
      dispatch(logoutAction());
      router.replace("/welcome");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout, dispatch, router]);

  const handleCheckVerification = useCallback(async (): Promise<void> => {
    const currentTime = Date.now();
    setLastCheckTime(currentTime);
    await refetchUser();
    if (userData?.user) {
      dispatch(setUser(userData.user as MentorPersonalInfoProps));
      Toast.show({
        type: userData.user.status === "Verified" ? "success" : "info",
        text1: userData.user.status === "Verified" ? "Verification Successful" : "Verification Pending",
        text2: userData.user.status === "Verified" ? "Your account has been verified!" : "Your account is still under review.",
      });
    }
  }, [refetchUser, userData, dispatch]);

  useEffect(() => {
    if (user?.status === "Verified") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const elapsed = Date.now() - lastCheckTime;
        return Math.max(0, COOLDOWN_PERIOD - elapsed);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastCheckTime]);

  const canCheck = useMemo(() => timeRemaining === 0, [timeRemaining]);
  const buttonText = useMemo(() => 
    canCheck ? "Check Verification" : `Try Again in ${Math.ceil(timeRemaining / 1000)}s`,
    [canCheck, timeRemaining]
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center h-screen">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    router.replace("/welcome");
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-end p-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-4 py-2 rounded flex-row items-center"
        >
          <Feather name="log-out" size={18} color="white" />
          <Text className="text-white font-mada-medium ml-2">
            {isPending ? "Logging out..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center p-6">
        <LottieView
          source={require("../../assets/verification-pending.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
        <View className="p-6 text-center">
          <Text className="text-3xl font-mada-semibold text-yellow-600 mb-6 text-center">
            Pending Verification
          </Text>
          <Text className="text-gray-900 text-center font-mada-regular">
            Your account is pending verification. Please wait for admin approval.
          </Text>
        </View>
      </View>
      <View className="items-center mb-6">
        <TouchableOpacity
          onPress={handleCheckVerification}
          className={`w-[90%] py-3 rounded-lg ${canCheck ? "bg-primary" : "bg-gray-300"}`}
          disabled={!canCheck}
        >
          <Text className="text-white text-center font-mada-medium">
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Status;
