import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex-1 items-center justify-center space-y-5">
        <Image
          source={require("../../assets/images/welcome.png")}
          alt="Welcome at Leadlly"
          resizeMode="contain"
          className="w-72 h-72"
        />

        <Text className="text-2xl font-mada-semibold leading-tight text-center">
          Learning is Everything
        </Text>

        <Text className="text-base font-mada-medium leading-tight text-center w-80">
          Unlock your potential with personalized learning, diverse courses, and
          a vibrant community—let's begin your journey!
        </Text>

        <Link href={"/sign-up" as Href} asChild>
          <TouchableOpacity className="w-3/4 h-11 bg-primary items-center justify-center flex-row space-x-2 rounded-full">
            <Text className="text-white text-base leading-tight font-mada-medium">
              Get Started
            </Text>
            <Feather name="arrow-right" size={16} color="white" />
          </TouchableOpacity>
        </Link>

        <Link href={"/login"}>
          <Text className="text-base font-mada-regular leading-tight">
            Already have an account?
          </Text>{" "}
          <Text className="text-base text-primary font-mada-medium leading-tight">
            Login
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
