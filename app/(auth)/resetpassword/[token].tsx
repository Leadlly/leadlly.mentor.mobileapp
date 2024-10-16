import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../../components/shared/Input";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useResetPassword } from "../../../services/queries/userQuery";
import { useState } from "react";
import Toast from "react-native-toast-message";

const ResetPasswordSchema = z.object({
  password: z.string({ required_error: "Please enter your new password." }),
  confirmPassword: z.string({
    required_error: "Please confirm your password!",
  }),
});

const ResetPassword = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const [toggleShowConfirmPassword, setToggleShowConfirmPassword] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { token } = useLocalSearchParams<{ token: string }>();

  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      const res = await resetPassword({ password: data.password });
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
              Reset Password
            </Text>
            <Text className="text-center text-secondary-text font-mada-regular leading-tight">
              Choose a new password for your account
            </Text>
          </View>

          <View className="mb-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder="Enter a new password"
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
              <Text className="text-red-600 font-mada-medium text-sm">
                {form.formState.errors.password.message}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry={toggleShowConfirmPassword ? false : true}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  autoCapitalize="none"
                  inputStyle="text-lg h-12"
                  icon={<Feather name="lock" size={18} color="#7F7F7F" />}
                  icon2={
                    toggleShowConfirmPassword ? (
                      <FontAwesome6
                        name="eye-slash"
                        size={16}
                        color="#7F7F7F"
                      />
                    ) : (
                      <FontAwesome6 name="eye" size={16} color="#7F7F7F" />
                    )
                  }
                  handlePress={() =>
                    setToggleShowConfirmPassword(!toggleShowConfirmPassword)
                  }
                />
              )}
            />
            {form.formState.errors.confirmPassword && (
              <Text className="text-red-600 font-mada-medium text-sm">
                {form.formState.errors.confirmPassword.message}
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
                "Reset Password"
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

export default ResetPassword;
