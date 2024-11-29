import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { z } from "zod";
import { colors } from "../../constants/constants";
import { ScheduleMeetingFormSchema } from "@/schemas/formSchema";
import CalendarModal from "./CalendarModal";
import TimeModal from "./TimeModal";
import GMeetInputLinkModal from "./GMeetInputModal";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@/services/redux/hooks";
import { useScheduleMeeting } from "@/services/queries/mettingQuery";

interface ScheduleMeetingFormProps {
  studentIds: string | string[];
  onClose: () => void;
}

const ScheduleMeetingForm = ({ studentIds, onClose }: ScheduleMeetingFormProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [openGMeetLinkInputModal, setOpenGMeetLinkInputModal] = useState(false);

  const mentorGMeetLink = useAppSelector(
    (state: any) => state.user.user?.gmeet.link
  );

  const form = useForm<z.infer<typeof ScheduleMeetingFormSchema>>({
    resolver: zodResolver(ScheduleMeetingFormSchema),
  });

  const { mutateAsync, isPending } = useScheduleMeeting();

  const handleGMeetLinkInputModal = () => {
    setOpenGMeetLinkInputModal(true);
  };

  const handleFormSubmit = async (
    data: z.infer<typeof ScheduleMeetingFormSchema>
  ) => {
    if (!mentorGMeetLink) {
      Toast.show({
        type: "error",
        text1: "No meeting link available!",
        text2: "Please add a Google Meet link before scheduling.",
      });
      return;
    }

    const formattedData = {
      date: new Date(data.date_of_meeting),
      time: data.time,
      studentIds: Array.isArray(studentIds) ? studentIds : [studentIds],
      message: data?.meeting_agenda,
    };

    try {
      const res = await mutateAsync(formattedData);
      if (!res.success) {
        Toast.show({
          type: "error",
          text1: "Scheduling Failed",
          text2: res.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Meeting Scheduled",
        text2: res.message,
      });
      form.reset();
      onClose();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <ScrollView className="bg-white mb-16">
      <View className="p-4 space-y-2 pb-0">
        <Text className="text-xl font-semibold ">Schedule Meeting</Text>

        <View className="flex flex-row gap-5 mb-4">
          <View className="flex-1 bg-white">
            <Controller
              name="date_of_meeting"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
                  <View className="px-3 h-12 text-left font-normal border border-gray-300 rounded-lg flex-row items-center">
                    <Text className="flex-1">
                      {field.value
                        ? field.value.toLocaleDateString()
                        : "Pick a date"}
                    </Text>
                    <Feather name="calendar" size={18} color="black" />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View className="flex-1 bg-white">
            <Controller
              name="time"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <TouchableOpacity onPress={() => setIsTimeModalVisible(true)}>
                  <View className="h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center">
                    <View className="mr-3">
                      <MaterialIcons
                        name="access-time"
                        size={18}
                        color="#7F7F7F"
                      />
                    </View>
                    <Text className="flex-1">
                      {field.value || "Select a time"}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View className="">
          <Controller
            name="meeting_agenda"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <View className="bg-white border border-input-border p-3 rounded-lg flex">
                <TextInput
                  placeholder="Type your doubt here..."
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  cursorColor={colors.primary}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={2}
                  className="text-lg font-mada-regular max-h-20 flex-1"
                />
              </View>
            )}
          />
        </View>
        <View className="my-3">
          {Object.keys(form.formState.errors).length > 0 && (
            <Text className="text-red-500 text-xs mt-2">
              Please fill in all required fields correctly.
            </Text>
          )}
        </View>
        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity
            onPress={handleGMeetLinkInputModal}
            className="bg-primary/10 py-3 px-4 rounded-xl flex-row items-center justify-center flex-1 mr-2 h-12"
          >
            <Feather
              name="link"
              size={18}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <Text
              className="text-primary font-mada-semibold text-sm"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {mentorGMeetLink ? "Update Link" : "Get Link"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={form.handleSubmit(handleFormSubmit)}
            disabled={!mentorGMeetLink || isPending}
            className={`bg-primary rounded-xl py-3 px-4 flex-row items-center justify-center flex-1 ml-2 h-12 ${
              !mentorGMeetLink || isPending ? "opacity-50" : ""
            }`}
          >
            {isPending ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginRight: 8 }}
              />
            ) : (
              <MaterialIcons
                name="schedule"
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
            )}
            <Text
              className="text-white font-mada-Bold text-sm"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isPending ? "Scheduling..." : "Schedule"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        value={form.watch("date_of_meeting")}
        onChange={(date) => form.setValue("date_of_meeting", date)}
      />

      <TimeModal
        visible={isTimeModalVisible}
        onClose={() => setIsTimeModalVisible(false)}
        value={form.watch("time")}
        onChange={(time) => form.setValue("time", time)}
      />

      {openGMeetLinkInputModal && (
        <GMeetInputLinkModal
          visible={openGMeetLinkInputModal}
          onClose={() => setOpenGMeetLinkInputModal(false)}
        />
      )}
    </ScrollView>
  );
};

export default ScheduleMeetingForm; 