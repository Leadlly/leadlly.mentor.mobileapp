import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import GoogleIcon from "../icons/GoogleIcon";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useGoogleSignIn } from "../../services/queries/userQuery";
import { useAppDispatch } from "../../services/redux/hooks";
import { useRouter } from "expo-router";
import { loginAction } from "../../services/redux/slices/userSlice";
import Toast from "react-native-toast-message";
import { colors } from "../../constants/constants";

const GoogleSignInButton = () => {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const { mutateAsync: signInWithGoogle, isPending } = useGoogleSignIn();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const singIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const getTokens = await GoogleSignin.getTokens();
        const res = await signInWithGoogle({
          access_token: getTokens.accessToken || "",
        });

        dispatch(loginAction({ token: res.data.token, ...res.data.user }));

        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        if (res.status === 201) {
          router.replace("/initialInfo" as any);
        } else {
          router.replace("/dashboard");
        }
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={singIn}
      disabled={isPending}
      className="w-full h-12 rounded-lg flex-row items-center justify-center space-x-2 mb-4 border border-primary"
    >
      {isPending ? (
        <ActivityIndicator size={"small"} color={colors.primary} />
      ) : (
        <>
          <GoogleIcon />
          <Text className="text-base text-primary font-mada-semibold leading-none">
            Sign in with Google
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
