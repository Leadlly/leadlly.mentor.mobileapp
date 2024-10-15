import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import * as z from "zod";
  import { LoginFormSchema } from "../../schemas/loginSchema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import Feather from "@expo/vector-icons/Feather";
  import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { Link, useRouter } from "expo-router";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useLoginUser } from "../../services/queries/userQuery";
  import { useAppDispatch } from "../../services/redux/hooks";
  import { loginAction } from "../../services/redux/slices/userSlice";
  import Toast from "react-native-toast-message";
  import Input from "@/components/shared/Input";
  import GoogleSignInButton from "../../components/AuthComponents/GoogleSignInButton";
  import LottieView from "lottie-react-native";
  
  const Login = () => {
    const [toggleShowPassword, setToggleShowPassword] = useState(false);
    const login_animation = useRef<LottieView>(null);
  
    const router = useRouter();
  
    const dispatch = useAppDispatch();
  
    const { mutateAsync: login, isPending } = useLoginUser();
  
    const form = useForm<z.infer<typeof LoginFormSchema>>({
      resolver: zodResolver(LoginFormSchema),
      defaultValues: {
        email: "",
      },
    });
  
    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
      try {
        const res = await login(data);
        dispatch(loginAction({ token: res.token, ...res.user }));
        Toast.show({
          type: "success",
          text1: res.message,
        });
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
  
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    };
  
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 25,
          }}
        >
          <View className="w-full pt-3 mb-2">
            <View className="w-9 h-9">
              <Image
                source={require("../../assets/images/leadlly_logo.png")}
                resizeMode="contain"
                className="absolute w-9 h-9"
              />
            </View>
          </View>
          <View className="w-full h-44 mb-5">
            <LottieView
              ref={login_animation}
              source={require("../../assets/login_animation.json")}
              autoPlay
              loop={true}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View className="w-full">
            <View className="mb-10">
              <Text className="text-5xl font-mada-Bold leading-tight text-center">
                Welcome
              </Text>
              <Text className="text-lg leading-tight font-mada-regular text-center">
                We are glad to see you with us
              </Text>
            </View>
  
            <GoogleSignInButton />
  
            <View className="flex-row items-center justify-center space-x-5 mb-4">
              <View className="w-10 h-[1px] bg-input-border" />
              <Text className="text-base font-mada-medium text-tab-item-gray">
                OR
              </Text>
              <View className="w-10 h-[1px] bg-input-border" />
            </View>
  
            <View className="mb-4">
              <Controller
                name="email"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    inputMode="email"
                    placeholder="Enter your email"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    inputStyle="pr-3 text-lg h-12"
                    icon={<AntDesign name="user" size={18} color="#7F7F7F" />}
                  />
                )}
              />
              {form.formState.errors.email && (
                <Text className="text-red-600 font-mada-medium">
                  {form.formState.errors.email.message}
                </Text>
              )}
            </View>
  
            <View className="mb-4">
              <Controller
                name="password"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    placeholder="Password"
                    secureTextEntry={toggleShowPassword ? false : true}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="none"
                    inputStyle="text-lg h-12"
                    icon={<Feather name="lock" size={18} color="#7F7F7F" />}
                    icon2={
                      toggleShowPassword ? (
                        <FontAwesome6
                          name="eye-slash"
                          size={16}
                          color="#7F7F7F"
                        />
                      ) : (
                        <FontAwesome6 name="eye" size={16} color="#7F7F7F" />
                      )
                    }
                    handlePress={() => setToggleShowPassword(!toggleShowPassword)}
                  />
                )}
              />
              {form.formState.errors.password && (
                <Text className="text-red-600 font-mada-medium">
                  {form.formState.errors.password.message}
                </Text>
              )}
            </View>
  
            <TouchableOpacity
              onPress={form.handleSubmit(onSubmit)}
              disabled={isPending}
              className="w-full h-12 bg-primary rounded-lg items-center justify-center mb-4 disabled:bg-primary/30"
            >
              {isPending ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <Text className="text-lg font-mada-semibold text-white">
                  Login
                </Text>
              )}
            </TouchableOpacity>
  
            <View className="mb-2 flex-row justify-between">
              <Text className="text-center text-base text-[#7F7F7F]">
                No account yet?{" "}
                <Link href={"/sign-up"} className="text-primary font-mada-medium">
                  Sign Up
                </Link>
              </Text>
              <Link
                href={"/forgot-password"}
                className="text-primary text-base text-center font-mada-medium"
              >
                Forgot Password
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Login;
  