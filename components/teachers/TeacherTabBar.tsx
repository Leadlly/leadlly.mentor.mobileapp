import {
  View,
  Text,
  Platform,
  StyleSheet,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/constants";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { tabBarIcons } from "./TabBarIcons";

const TeacherTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1500,
    });
  }, [state.index]);

  return (
    <View onLayout={onTabBarLayout} style={styles.tabBar}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: horizontalScale(32),
            backgroundColor: colors.primary,
            height: 4,
            width: buttonWidth / 2,
            borderRadius: 1000,
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            {tabBarIcons[route.name as keyof typeof tabBarIcons]({
              color: isFocused ? colors.primary : colors.tabItemGray,
            })}
            <Text
              className="font-mada-medium"
              style={{
                color: isFocused ? colors.primary : colors.tabItemGray,
                textAlign: "center",
                fontSize: moderateScale(11),
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? verticalScale(70) : 64,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 8 }, // adjust height for vertical offset
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
});

export default TeacherTabBar;
