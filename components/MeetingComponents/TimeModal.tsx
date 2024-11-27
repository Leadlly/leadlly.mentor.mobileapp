import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

interface TimeModalProps {
  visible: boolean;
  onClose: () => void;
  value: string | null;
  onChange: (time: string) => void;
}

const TimeModal: React.FC<TimeModalProps> = ({
  visible,
  onClose,
  value,
  onChange,
}) => {
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const intervalCount = (22 - 9) * 4 + 1;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50 bg-opacity-50">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-5 w-4/5 h-3/5">
              <Text className="text-center text-xl font-mada-Bold mb-5">
                Select Time
              </Text>
              <FlatList
                data={Array.from({ length: intervalCount }).map((_, i) => {
                  const hour = Math.floor(i / 4) + 9;
                  const minute = (i % 4) * 15;
                  return formatTime(hour, minute);
                })}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-2"
                    onPress={() => {
                      onChange(item);
                      onClose();
                    }}
                  >
                    <Text 
                      className={`text-center text-lg font-mada-regular ${
                        item === value ? "text-primary" : ""
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                className="mt-5 bg-primary rounded-md py-2"
                onPress={onClose}
              >
                <Text className="text-center text-white text-base font-mada-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TimeModal;
