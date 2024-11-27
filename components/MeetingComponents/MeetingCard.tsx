import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Linking } from "react-native";
import { formatDate } from "@/helpers/utils";

interface Meeting {
  _id: string;
  date: string;
  time: string;
  student: string;
  mentor: string;
  gmeet: { link: string };
  createdBy: string;
  isCompleted: boolean;
  accepted: boolean;
  message: string;
  rescheduled?: {
    date: string;
    isRescheduled: boolean;
    time: string;
  };
}

interface MeetingCardProps {
  meeting: Meeting;
  onOptionsPress: (meeting: Meeting) => void;
}

const MeetingCard = ({ meeting, onOptionsPress }: MeetingCardProps) => {
  return (
    <View className="flex-row border-2 border-gray-200 rounded-lg p-3 my-2 bg-white shadow shadow-primary/70 space-x-2">
      <View className="bg-primary/10 rounded-lg w-24 h-24 items-center justify-center p-2">
        <Text className="text-sm font-mada-semibold">
          {formatDate(
            new Date(
              meeting.rescheduled && meeting.rescheduled.isRescheduled
                ? meeting.rescheduled.date
                : meeting.date
            )
          )}
        </Text>
        <Text className="text-xs text-gray-600 font-mada-semibold">
          {meeting.rescheduled && meeting.rescheduled.isRescheduled
            ? meeting.rescheduled.time
            : meeting.time}
        </Text>
        {meeting.rescheduled && meeting.rescheduled.isRescheduled && (
          <Text className="text-xs text-red-500 font-mada-semibold mt-1">
            Rescheduled
          </Text>
        )}
      </View>
      <View className="flex-1 pl-3 justify-between">
        <View className="flex-row justify-between items-center">
          <Text numberOfLines={1} className="text-base font-mada-semibold flex-1">
            {meeting.message ? meeting.message : "New Meeting"}
          </Text>
        </View>
        <View className="flex items-center gap-1 flex-row">
          <AntDesign
            name={
              meeting.isCompleted
                ? "checkcircleo"
                : meeting.accepted
                ? "clockcircleo"
                : "exclamationcircleo"
            }
            size={14}
            color={
              meeting.isCompleted
                ? "#6B7280"
                : meeting.accepted
                ? "#059669"
                : "#DC2626"
            }
          />
          <Text
            className={`text-sm ${
              meeting.isCompleted
                ? "text-gray-500"
                : meeting.accepted
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {meeting.isCompleted
              ? "Meeting Over"
              : meeting.accepted
              ? "Upcoming Meeting"
              : "Meeting Request"}
          </Text>
        </View>

        {meeting.isCompleted ? (
          <View className="bg-gray-300 rounded-md py-2 px-4 mt-3">
            <Text className="text-gray-600 text-center text-sm font-mada-semibold">
              Meeting Completed
            </Text>
          </View>
        ) : meeting.gmeet && meeting.gmeet.link ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(meeting.gmeet.link || "#")}
          >
            <View className="bg-primary rounded-md py-2 px-4 mt-3">
              <Text className="text-white text-center text-sm font-mada-semibold">
                Join Meeting
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View className="bg-primary/60 rounded-md py-2 px-4 mt-3">
            <Text className="text-white text-center text-sm font-mada-semibold">
              Join Meeting
            </Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={() => onOptionsPress(meeting)}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MeetingCard; 