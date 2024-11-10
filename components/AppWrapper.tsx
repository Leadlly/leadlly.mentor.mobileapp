import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import { loadUser } from "../services/redux/slices/userSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProtectRoute from "./ProtectRoute";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import NetInfo from "@react-native-community/netinfo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OfflineScreen from "./OfflineScrren";

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    dispatch(loadUser()); 
  }, [dispatch]);

  if (!isConnected) {
    return <OfflineScreen setConnected={setConnected} />;
  }
  
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ProtectRoute>
          <Stack screenOptions={{ headerShadowVisible: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen
              name="student/[studentId]"
              options={{ headerShown: false }}
            />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ProtectRoute>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AppWrapper;
