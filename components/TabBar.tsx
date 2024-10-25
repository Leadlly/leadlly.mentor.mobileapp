import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DashboardIcon from "./icons/DashboardIcon";
import CommunityIcon from "./icons/CommunityIcon";

const TabBar = ({ state, descriptors, navigation }: any) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", icon: DashboardIcon, label: "Dashboard" },
    { id: "community", icon: CommunityIcon, label: "Community" },
  ];

  const onPress = (itemId: any) => {
    setActiveTab(itemId);
    const selectedRoute = state.routes.find(
      (route: any) => route.name === itemId
    );
    if (selectedRoute) {
      const event = navigation.emit({
        type: "tabPress",
        target: selectedRoute.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(selectedRoute.name, selectedRoute.params);
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
      className="absolute bottom-0 w-full p-4 flex justify-center items-center"
    >
      <View className="bg-white flex flex-row items-center p-1 rounded-full shadow-md space-x-3 shadow-black/90">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onPress(tab.id)}
            accessibilityRole="button"
            accessibilityState={activeTab === tab.id ? { selected: true } : {}}
            className={`flex justify-center items-center w-12 h-12 rounded-full ${
              activeTab === tab.id ? "bg-purple-500" : ""
            }`}
          >
            <tab.icon
              stroke={activeTab === tab.id ? "#FFFFFF" : "#8E8E93"}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabBar;
