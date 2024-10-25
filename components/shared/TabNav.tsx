import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../../constants/constants";
import clsx from "clsx";

type TabNavProps = {
  width: number;
  height: number;
  items: Array<{
    id?: string;
    name: string;
  }>;
  activeItem: string;
  setActiveItem: (activeItem: string) => void;
  containerClassName?: string;
  itemClassName?: string;
  itemTextClassName?: string;
};

const TabNav = ({
  items = [],
  activeItem,
  setActiveItem,
  height,
  width,
  containerClassName,
  itemClassName,
  itemTextClassName,
}: TabNavProps) => {
  const [dimensions, setDimensions] = useState({ width, height });
  const [tabWidth, setTabWidth] = useState(0);

  // const tabWidth = dimensions.width / items?.length!;

  // const onTabLayout = (e: LayoutChangeEvent) => {
  //   setDimensions({
  //     width: e.nativeEvent.layout.width,
  //     height: e.nativeEvent.layout.height,
  //   });
  // };
  const onTabLayout = (e: LayoutChangeEvent) => {
    const { width: newWidth, height: newHeight } = e.nativeEvent.layout;
    setDimensions({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    if (dimensions.width > 0 && items.length > 0) {
      setTabWidth(dimensions.width / items.length);
    }
  }, [dimensions.width, items.length]);

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabLayout}
      className={clsx(
        "flex-row items-center border border-input-border rounded-md p-0.5",
        containerClassName
      )}
    >
      {/* {tabWidth > 0 && (
        <Animated.View
          style={[
            animatedStyle,
            {
              position: "absolute",
              backgroundColor: colors.primary,
              borderRadius: 5,
              marginHorizontal: 2,
              height: dimensions.height - 6,
              width: tabWidth - 5,
            },
          ]}
        />
      )} */}
      {items?.map((item, index) => (
        <Pressable
          key={item.name}
          className={clsx(
            "items-center justify-center rounded",
            item.name === activeItem && "bg-primary",
            itemClassName
          )}
          onPress={() => setActiveItem(item.name)}
        >
          <Text
            className={clsx(
              "capitalize text-[10px] font-mada-semibold leading-tight",
              itemTextClassName,
              activeItem === item.name && "text-white"
            )}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TabNav;
