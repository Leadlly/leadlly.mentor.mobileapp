import {
    View,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import * as z from "zod";
  import { Controller, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import Input from "../../components/shared/Input";
  import Feather from "@expo/vector-icons/Feather";
  import { Link, useRouter } from "expo-router";
  import { useForgotPassword } from "../../services/queries/userQuery";
  import Toast from "react-native-toast-message";
  
  const ForgotPasswordSchema = z.object({
    email: z
      .string({ required_error: "Please enter your email." })
      .email({ message: "Invalid email address!" }),
  });
  
  const ForgotPassword = () => {
    const router = useRouter();
  
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
      resolver: zodResolver(ForgotPasswordSchema),
    });
  
    const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  
    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
      try {
        const res = await forgotPassword(data);
        Toast.show({
          type: "success",
          text1: res.message,
        });
  
        router.replace("/login");
      } catch (error: any) {
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
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 25,
          }}
        >
          <View className="w-full">
            <View className="items-center justify-center mb-10">
              <Text className="text-2xl font-mada-Bold mt-5 mb-3">
                Forgot Password
              </Text>
              <Text className="text-center text-secondary-text font-mada-regular leading-tight">
                Enter the email you used to create your account so we can send you
                a link for resetting your password
              </Text>
            </View>
  
            <View className="mb-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input
                    inputMode="email"
                    placeholder="example@mail.com"
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
                  Send
                </Text>
              )}
            </TouchableOpacity>
  
            <Link href={"/login"} asChild>
              <TouchableOpacity className="w-full h-12 border border-secondary-text rounded-lg items-center justify-center mb-4">
                <Text className="text-base font-mada-medium">Back to Log in</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ForgotPassword;
  