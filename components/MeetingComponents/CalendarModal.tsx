import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { colors } from "../../constants/constants";

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  value: Date | null;
  onChange: (date: Date) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  value,
  onChange,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <Text className="text-center text-2xl font-mada-Bold mb-4">
                Select Date
              </Text>
              <Calendar
                theme={{ todayTextColor: "black"}}
                onDayPress={(day: any) => {
                  onChange(new Date(day.dateString));
                  onClose();
                }}
                minDate={new Date().toISOString().split("T")[0]}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 7))
                    .toISOString()
                    .split("T")[0]
                }
                markedDates={{
                  [value ? value.toISOString().split("T")[0] : ""]: {
                    selected: true,
                    marked: true,
                    selectedColor: colors.primary,
                  },
                }}
              />
              <TouchableOpacity
                className="mt-4 bg-primary rounded-lg py-2"
                onPress={onClose}
              >
                <Text className="text-center text-white font-mada-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;
