import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  useGetMeetings,
  useAcceptMeeting,
  useRescheduleMeeting,
} from "@/services/queries/mettingQuery";
import { colors } from "@/constants/constants";
import ScheduleMeetingButton from "@/components/MeetingComponents/ScheduleMeetingButton";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@/components/shared/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CalendarModal from "@/components/MeetingComponents/CalendarModal";
import TimeModal from "@/components/MeetingComponents/TimeModal";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import MeetingCard from "@/components/MeetingComponents/MeetingCard";
import MeetingActions from "@/components/MeetingComponents/MeetingActions";

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

const Meetings = () => {
  const { studentId } = useLocalSearchParams();
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const rescheduleBottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);

  const form = useForm({
    defaultValues: {
      date_of_meeting: new Date(),
      time: "",
    },
  });

  const student = Array.isArray(studentId) ? studentId[0] : studentId;
  const { data: meetingsData, isLoading } = useGetMeetings(student);
  const acceptMeetingMutation = useAcceptMeeting();
  const rescheduleMeetingMutation = useRescheduleMeeting();

  const handleAccept = async (meetingId: string) => {
    try {
      await acceptMeetingMutation.mutateAsync(meetingId);
      bottomSheetModalRef.current?.dismiss();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error accepting meeting",
        text2: error.message,
      });
    }
  };

  const handleReschedule = (meetingId: string) => {
    const meeting = meetingsData?.meetings.find(
      (m: Meeting) => m._id === meetingId
    );
    if (meeting) {
      form.setValue("date_of_meeting", new Date(meeting.date));
      form.setValue("time", meeting.time);
    }
    setMeetingId(meetingId);
    bottomSheetModalRef.current?.dismiss();
    rescheduleBottomSheetRef.current?.present();
  };

  const confirmReschedule = async () => {
    if (!meetingId) return;

    const { date_of_meeting, time } = form.getValues();
    try {
      const result = await rescheduleMeetingMutation.mutateAsync({
        meetingId,
        data: { date: date_of_meeting, time },
      });
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Meeting rescheduled successfully",
        });
        rescheduleBottomSheetRef.current?.dismiss();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error rescheduling meeting",
        text2: error.message,
      });
    }
  };

  const sortedMeetings = useMemo(
    () =>
      meetingsData?.meetings?.sort((a: Meeting, b: Meeting) => {
        if (a.isCompleted === b.isCompleted) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return a.isCompleted ? 1 : -1;
      }),
    [meetingsData?.meetings]
  );

  const openBottomSheet = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    bottomSheetModalRef.current?.present();
  };
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <ScheduleMeetingButton studentId={student} />
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-20 mb-20 ">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : !sortedMeetings?.length ? (
          <View className=" py-20 items-center justify-center ">
            <Image
              source={require("../../../../assets/images/No-meetings.png")}
              className="w-48 h-48 my-4"
              resizeMode="contain"
            />
            <Text className="text-center text-gray-800 text-xl font-mada-semibold mb-2">
              No Meetings Scheduled
            </Text>
            <Text className="text-center text-gray-700 text-base font-mada-medium">
              You don't have any upcoming meetings at the moment.
            </Text>
          </View>
        ) : (
          sortedMeetings.map((meeting: Meeting) => (
            <MeetingCard
              key={meeting._id}
              meeting={meeting}
              onOptionsPress={openBottomSheet}
            />
          ))
        )}
      </ScrollView>

      <BottomSheet ref={bottomSheetModalRef} snapPoints={["25%"]}>
        <MeetingActions
          onAccept={() => handleAccept(selectedMeeting?._id || "")}
          onReschedule={() => handleReschedule(selectedMeeting?._id || "")}
          isAccepted={selectedMeeting?.accepted || false}
        />
      </BottomSheet>

      <BottomSheet ref={rescheduleBottomSheetRef} snapPoints={["50%"]}>
        <View className="p-4">
          <Controller
            name="date_of_meeting"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="mb-4 px-3 h-12 border border-gray-300 rounded-lg flex-row items-center"
              >
                <Text className="flex-1">
                  {field.value
                    ? field.value.toLocaleDateString()
                    : "Pick a date"}
                </Text>
                <Feather name="calendar" size={18} color="black" />
              </TouchableOpacity>
            )}
          />

          <Controller
            name="time"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setIsTimeModalVisible(true)}
                className="mb-4 h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center"
              >
                <MaterialIcons
                  name="access-time"
                  size={18}
                  color="#7F7F7F"
                  style={{ marginRight: 12 }}
                />
                <Text className="flex-1">{field.value || "Select a time"}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={confirmReschedule}
            className="bg-primary rounded-md py-3 px-4 flex-row items-center"
          >
            <Text className="text-white text-center font-mada-semibold flex-1 text-lg">
              Confirm Reschedule
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        value={form.getValues("date_of_meeting")}
        onChange={(date) => {
          form.setValue("date_of_meeting", date);
          setIsCalendarVisible(false);
        }}
      />

      <TimeModal
        visible={isTimeModalVisible}
        onClose={() => setIsTimeModalVisible(false)}
        value={form.getValues("time")}
        onChange={(time) => {
          form.setValue("time", time);
          setIsTimeModalVisible(false);
        }}
      />
    </View>
  );
};

export default Meetings;
