import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/constants";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { capitalizeFirstLetter } from "../../helpers/utils";
import ModalComponent from "./ModalComponent";

const Select = ({
  items,
  defaultValue,
  onValueChange,
  inputStyle,
  listContainerStyle,
  placeholder = "Select an item",
  label,
  labelStyle,
  fetching,
  loading,
  overallClassName,
}: {
  items: { _id: string; label: string | number; value: string | number }[];
  defaultValue: { name: string; _id: string } | null;
  onValueChange: (value: { name: string | number; _id: string }) => void;
  inputStyle?: string;
  listContainerStyle?: string;
  placeholder?: string;
  loading?: boolean;
  fetching?: boolean;
  label?: string;
  labelStyle?: string;
  overallClassName?: string;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    name: string | number;
    _id: string;
  } | null>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSelectValue = (data: {
    _id: string;
    label: string | number;
    value: string | number;
  }) => {
    setSelectedValue({ name: data.value, _id: data._id });
    onValueChange({ name: data.value, _id: data._id });
    setShowDropdown(false);
  };

  return (
    <View className={clsx("relative mb-4", overallClassName)}>
      {label ? (
        <Text
          className={clsx(
            "text-lg font-mada-medium leading-tight mb-1",
            labelStyle
          )}
        >
          {label}
        </Text>
      ) : null}
      <Pressable
        className={clsx(
          "  bg-white flex-row w-full h-12 items-center justify-between px-3 rounded-lg border border-input-border",
          inputStyle
        )}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <View className="flex-1">
          <Text
            className={clsx(
              "font-mada-medium text-base  leading-tight",
              !selectedValue ? "text-tab-item-gray" : "text-black"
            )}
          >
            {selectedValue
              ? capitalizeFirstLetter(String(selectedValue.name))
              : placeholder}
          </Text>
        </View>
        <Feather name="chevron-down" size={20} color="black" />
      </Pressable>

      <ModalComponent
        modalVisible={showDropdown}
        setModalVisible={setShowDropdown}
      >
        <View className="items-center justify-center py-3">
          <Text className="text-xl font-mada-semibold leading-none">
            Select a {label}
          </Text>
        </View>
        <ScrollView
          className={clsx(
            "h-80 bg-white rounded-lg border border-input-border py-1",
            listContainerStyle
          )}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {loading || fetching ? (
            <View>
              <ActivityIndicator size={"small"} color={colors.primary} />
            </View>
          ) : items && items.length > 0 ? (
            items.map((item) => (
              <Pressable
                key={item.value}
                className={clsx(
                  "flex-row items-center justify-between px-4 py-3 border-b border-input-border",
                  items[items.length - 1].value === item.value && "border-b-0"
                )}
                onPress={() => handleSelectValue(item)}
              >
                <Text>{capitalizeFirstLetter(String(item.label))}</Text>
                {selectedValue?.name === item.value && (
                  <Feather name="check" size={20} color="black" />
                )}
              </Pressable>
            ))
          ) : (
            <View className="h-10 items-center justify-center">
              <Text className="text-sm leading-tight font-mada-medium text-tab-item-gray">
                No items to show!
              </Text>
            </View>
          )}
        </ScrollView>
      </ModalComponent>
    </View>
  );
};

export default Select;
