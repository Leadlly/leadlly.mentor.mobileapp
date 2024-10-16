import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, Control } from "react-hook-form";
import OTPTextInput from "react-native-otp-textinput";
import { colors } from "@/constants/constants";
interface OTPInputProps {
  control: Control<{ otp: string }, any>;
  errors: any;
}

const OTPInput: React.FC<OTPInputProps> = ({ control, errors }) => {
  return (
    <View className="w-full items-center">
      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <OTPTextInput
            inputCount={6}
            handleTextChange={field.onChange}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            tintColor={colors.primary}
            offTintColor={colors.inputBorder}
          />
        )}
      />
      {errors.otp && (
        <Text className="text-red-500 text-xs">{errors.otp.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default OTPInput;
