import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProtectRoute from "./ProtectRoute";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppWrapper = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    // <BottomSheetModalProvider>
    //   <GestureHandlerRootView>
        <ProtectRoute>
          <Stack screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="(student)" options={{ headerShown: false }} />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ProtectRoute>
    //   </GestureHandlerRootView>
    // </BottomSheetModalProvider>
  );
};

export default AppWrapper;
