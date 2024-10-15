import { Image } from "expo-image";
import { Controller } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FormType } from "@/types/type";
import { colors } from "../../constants/constants";

const PhoneNumberForm = ({
  next,
  form,
}: {
  next: () => void;
  form: FormType;
}) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = form;

  const validatePhoneNumber = async () => {
    const isPhoneNumberValid = await trigger("phoneNumber");
    if (isPhoneNumberValid) {
      next();
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-5 py-12 px-12">
      <Image
        source={require("../../assets/images/phoneNumber.png")}
        className="w-[20vh] h-[20vh]"
      />
      <Text className="text-2xl font-mada-semibold leading-tight text-center">
        Enter Your Phone number?
      </Text>
      <Text className="text-base leading-tight font-mada-medium text-center">
        We need to register your phone number before getting Started!
      </Text>
      <View className="mb-4" style={styles.input}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <View className="h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center">
              <Text className="mr-3 text-lg font-mada-regular">+91</Text>
              <TextInput
                inputMode="numeric"
                placeholder="Phone number"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                cursorColor={colors.primary}
                selectionHandleColor={colors.primary}
                selectionColor={colors.primary200}
                keyboardType="numeric"
                className="w-full h-full text-lg font-mada-medium"
              />
            </View>
          )}
        />
        {errors.phoneNumber && (
          <Text className="text-red-600 font-mada-medium">
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>
      <Pressable
        onPress={validatePhoneNumber}
        className="w-2/4 h-12 bg-primary rounded-lg items-center justify-center mb-4 disabled:bg-primary/30"
      >
        <Text className="text-lg font-mada-semibold text-white">Confirm</Text>
      </Pressable>
    </View>
  );
};

export default PhoneNumberForm;

const styles = StyleSheet.create({
  input: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});
