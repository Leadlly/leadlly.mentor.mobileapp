import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  ViewToken,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLocalSearchParams } from "expo-router";
import DashboardIcon from "../icons/DashboardIcon";
import { SvgProps } from "react-native-svg";
import PlannerIcon from "../icons/PlannerIcon";
import TrackerIcon from "../icons/TrackerIcon";
import ErrorBookIcon from "../icons/ErrorBookIcon";
import { colors } from "../../constants/constants";
import { useAppSelector } from "../../services/redux/hooks";


const StudentTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [visibleItems, setVisibleItems] = useState<ViewToken[]>([]);

  const { studentId } = useLocalSearchParams();

  const student = Array.isArray(studentId) ? studentId[0] : studentId;

  const flatListRef = useRef<FlatList<any>>(null);

  console.log("TabBar studentId:", studentId); // Debug log

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<(typeof state.routes)[0]>) => {
    const { options } = descriptors[item.key];
    const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);

    if (["_sitemap", "+not-found"].includes(item.name)) return null;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: item.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // Pass the studentId when navigating
        navigation.navigate(item.name, {
          ...item.params,
          studentId: studentId // Ensure studentId is passed
        });

      }

      const firstVisibleItem = visibleItems[0]?.index;
      const lastVisibleItem = visibleItems[visibleItems.length - 1]?.index;

      if (index === lastVisibleItem && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: index + 1 < state.routes.length ? index + 1 : index,
          animated: true,
        });
      } else if (
        index === firstVisibleItem &&
        lastVisibleItem === state.routes.length - 1 &&
        flatListRef.current
      ) {
        const nextIndex = lastVisibleItem + 1;
        if (nextIndex < state.routes.length) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: item.key,
      });
    };

    const icons = {
      dashboard: (props: SvgProps) => <DashboardIcon {...props} />,
      planner: (props: SvgProps) => <PlannerIcon {...props} />,
      tracker: (props: SvgProps) => <TrackerIcon {...props} />,

      //   "(chat)": (props: SvgProps) => <ChatIcon {...props} />,
      //   "(quizzes)": (props: SvgProps) => <QuizzesIcon {...props} />,
      errorbook: (props: SvgProps) => <ErrorBookIcon {...props} />,
    };

    return (
      <TouchableOpacity
        key={item.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        className="flex-1 justify-center items-center gap-y-2 w-[72px]"
      >
        {icons[item.name as keyof typeof icons]({
          stroke: isFocused ? colors.primary : colors.tabItemGray,
        })}
        <Text
          className={`font-mada-medium text-xs leading-tight ${
            isFocused ? "text-primary" : "text-tab-item-gray"
          }`}
        >
          {label?.toString()}
        </Text>
      </TouchableOpacity>
    );
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    setVisibleItems(viewableItems);
  };

  return (
    <View className="absolute bottom-0 bg-white h-16 border-t border-[#d8d5d5] w-full">
      <FlatList
        ref={flatListRef}
        data={state.routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        className="h-full"
      />
    </View>
  );
};

export default StudentTabBar;