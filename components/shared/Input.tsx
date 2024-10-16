import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
  } from "react-native";
  import React from "react";
  import clsx from "clsx";
  import { InputFieldProps } from "@/types/type";
  import { TextInput } from "react-native";
  import { colors } from "../../constants/constants";
  
  const Input = ({
    className,
    label,
    labelStyle,
    containerStyle,
    icon,
    iconStyle,
    icon2,
    icon2Style,
    inputStyle,
    secureTextEntry,
    inputMode,
    handlePress,
    ...props
  }: InputFieldProps) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-full">
            {label ? (
              <Text
                className={clsx(
                  "text-base font-mada-medium leading-none mb-1",
                  labelStyle
                )}
              >
                {label}
              </Text>
            ) : null}
  
            <View
              className={clsx(
                "flex-row items-center justify-start rounded-lg border border-input-border",
                containerStyle
              )}
            >
              {icon && (
                <View
                  className={clsx("w-10 items-center justify-center", iconStyle)}
                >
                  {icon}
                </View>
              )}
              {inputMode && inputMode === "tel" && (
                <View className="w-10 items-center justify-center">
                  <Text className="text-left text-base font-mada-regular">
                    +91
                  </Text>
                </View>
              )}
              <TextInput
                secureTextEntry={secureTextEntry}
                cursorColor={colors.primary}
                selectionHandleColor={colors.primary}
                selectionColor={colors.primary200}
                {...props}
                className={clsx(
                  "text-left text-base h-10 flex-1 font-mada-regular",
                  inputStyle
                )}
              />
              {icon2 && (
                <Pressable
                  onPress={handlePress}
                  className={clsx("w-10 items-center justify-center", icon2Style)}
                >
                  {icon2}
                </Pressable>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  export default Input;
  