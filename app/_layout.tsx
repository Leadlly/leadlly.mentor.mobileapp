import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import Toast from "react-native-toast-message";
import AppWrapper from "@/components/AppWrapper";
import NotificationHandler from "@/components/NotificationHandler";
import { SocketProvider } from "@/contexts/SocketProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Mada-Black": require("@/assets/fonts/Mada-Black.ttf"),
    "Mada-Bold": require("@/assets/fonts/Mada-Bold.ttf"),
    "Mada-ExtraBold": require("@/assets/fonts/Mada-ExtraBold.ttf"),
    "Mada-ExtraLight": require("@/assets/fonts/Mada-ExtraLight.ttf"),
    "Mada-Light": require("@/assets/fonts/Mada-Light.ttf"),
    "Mada-Medium": require("@/assets/fonts/Mada-Medium.ttf"),
    "Mada-Regular": require("@/assets/fonts/Mada-Regular.ttf"),
    "Mada-SemiBold": require("@/assets/fonts/Mada-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  const queryClient = new QueryClient();

  if (!fontsLoaded && !error) return null;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <NotificationHandler />
          <AppWrapper />
          <Toast />
        </SocketProvider>
      </QueryClientProvider>
    </Provider>
  );
}
