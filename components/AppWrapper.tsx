import { useEffect } from "react";
import { useAppDispatch } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";


const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();



  return (
    <>
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(student)" options={{ headerShown: false }} />
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </>
  );
};

export default AppWrapper;
