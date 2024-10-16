import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import * as z from "zod";
  import { SignUpFormSchema } from "../../schemas/loginSchema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import Feather from "@expo/vector-icons/Feather";
  import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
  import { Link, useRouter } from "expo-router";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useSignUpUser } from "../../services/queries/userQuery";
  import Toast from "react-native-toast-message";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import Input from "../../components/shared/Input";
  import GoogleSignInButton from "../../components/AuthComponents/GoogleSignInButton";
  import LottieView from "lottie-react-native";
  
  const SignUp = () => {
    const [toggleShowPassword, setToggleShowPassword] = useState(false);
    const signUp_animation = useRef<LottieView>(null);
  
    const router = useRouter();
  
    const { mutateAsync: signUp, isPending } = useSignUpUser();
  
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });
  
    const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
      try {
        const res = await signUp(data);
        Toast.show({
          type: "success",
          text1: res.message,
        });
        AsyncStorage.setItem("email", data.email);
        router.push("/verify" as any);
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
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 25,
          }}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="w-full pt-3 mb-2">
            <View className="w-11 h-11">
              <Image
                source={require("../../assets/images/leadlly_logo.png")}
                resizeMode="contain"
                className="absolute w-11 h-11"
              />
            </View>
          </View>
          <View className="w-full h-48 mb-4">
            <LottieView
              ref={signUp_animation}
              source={require("../../assets/signup_animation.json")}
              autoPlay
              loop={true}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View className="w-full">
            <View className="w-full mb-8">
              <Text className="text-3xl font-mada-Bold leading-tight text-center">
                Create an account
              </Text>
              <Text className="text-base leading-tight font-mada-regular text-center w-80 mx-auto">
                Unlock your potential with expert guidance sign up for mentorship
                today!
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
                name="name"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    inputMode="text"
                    placeholder="Enter full name"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCapitalize="words"
                    inputStyle="pr-3 text-lg h-12"
                    icon={<AntDesign name="user" size={18} color="#7F7F7F" />}
                  />
                )}
              />
              {form.formState.errors.name && (
                <Text className="text-red-600 font-mada-medium">
                  {form.formState.errors.name.message}
                </Text>
              )}
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
                    icon={<Feather name="mail" size={18} color="#7F7F7F" />}
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
                    placeholder="Create Password"
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
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
  
            <View className="mb-2 flex-row justify-center">
              <Text className="text-center text-base text-[#7F7F7F]">
                Already have an account ?{" "}
                <Link href={"/login"} className="text-primary font-mada-medium">
                  Login
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  // const styles = StyleSheet.create({
  //   boxShadow: {
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 0,
  //     },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 4.65,
  //     elevation: 6,
  //   },
  // });
  
  export default SignUp;
  