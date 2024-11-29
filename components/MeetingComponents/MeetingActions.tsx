import React from "react";
import { View, Text, Pressable } from "react-native";
import { CheckBadgeIcon } from "react-native-heroicons/outline";
import { Calendar } from "lucide-react-native";

interface MeetingActionsProps {
  onAccept: () => void;
  onReschedule: () => void;
  isAccepted: boolean;
}

const MeetingActions = ({
  onAccept,
  onReschedule,
  isAccepted,
}: MeetingActionsProps) => {
  return (
    <View className="p-4 rounded-xl">
      <Pressable
        onPress={onAccept}
        disabled={isAccepted}
        className={`flex-row items-center justify-center py-3.5 px-5 rounded-lg mb-3 ${
          isAccepted ? "bg-gray-300" : "bg-green-500"
        }`}
      >
        <CheckBadgeIcon stroke="#FFFFFF" size={24} />
        <Text
          className={`ml-3 text-base font-semibold ${
            isAccepted ? "text-gray-600" : "text-white"
          }`}
        >
          {isAccepted ? "Meeting Accepted" : "Accept Meeting"}
        </Text>
      </Pressable>
      <Pressable
        onPress={onReschedule}
        className="flex-row items-center justify-center py-3.5 px-5 rounded-lg bg-white border border-blue-600"
      >
        <Calendar stroke="#2563EB" size={24} />
        <Text className="ml-3 text-base font-semibold text-blue-600">
          Reschedule Meeting
        </Text>
      </Pressable>
    </View>
  );
};

export default MeetingActions;
