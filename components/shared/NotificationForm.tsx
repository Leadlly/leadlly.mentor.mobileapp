import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import { z } from "zod";
import { colors } from "../../constants/constants";
import MultiUrlInput from "./MultiInput";
import { useSendNotification } from "@/services/queries/notificationQuery";
import Toast from "react-native-toast-message";

const NotificationFormSchema = z.object({
  message: z.string().min(1, "Message must be at least 40 characters"),
  urls: z.array(z.string().url()).optional(),
  notificationType: z.enum(["general", "app-update"]),
});

interface NotificationFormProps {
  studentIds: string[];
  onClose: () => void;
}

const NotificationForm = ({ studentIds, onClose }: NotificationFormProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const form = useForm<z.infer<typeof NotificationFormSchema>>({
    resolver: zodResolver(NotificationFormSchema),
    defaultValues: {
      urls: [],
      notificationType: "general",
    },
  });

  const { mutateAsync, isPending } = useSendNotification();

  const handleFormSubmit = async (
    data: z.infer<typeof NotificationFormSchema>
  ) => {
    try {
      const payload = {
        studentIds,
        message: data.message,
        urls: data.urls || [],
        option: data.notificationType,
      };
      await mutateAsync(payload);
      Toast.show({
        type: "success",
        text1: "Notification sent successfully",
      });
      onClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to send notification",
        text2:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const notificationTypeOptions = [
    { _id: "general", label: "General", value: "general" },
    { _id: "app-update", label: "App Update", value: "app-update" },
  ];

  return (
    <ScrollView className="bg-white mb-16">
      <View className="p-4 space-y-2 pb-0">
        <Text className="text-xl font-semibold">Send Notification</Text>

        <View className="mt-4">
          <Controller
            name="notificationType"
            control={form.control}
            render={({ field }) => (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-white border border-input-border p-3 rounded-lg"
              >
                <Text>
                  {field.value ? field.value : "Select notification type"}
                </Text>
                <View className="absolute right-3 top-3">
                  <Feather name="chevron-down" size={20} color="gray" />
                </View>
              </TouchableOpacity>
            )}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/60">
              <View className="bg-white p-6 rounded-2xl w-3/4 shadow-lg">
                <Text className="text-lg font-semibold mb-4">
                  Select Notification Type
                </Text>
                {notificationTypeOptions.map((option) => (
                  <TouchableOpacity
                    key={option._id}
                    onPress={() => {
                      form.setValue(
                        "notificationType",
                        option.value as "general" | "app-update"
                      );
                      setModalVisible(false);
                    }}
                    className="py-3 px-4 mb-2 border border-gray-100 rounded-lg flex-row justify-between items-center active:bg-gray-50"
                  >
                    <View className="flex-row items-center">
                      <Feather
                        name={
                          option.value === "general" ? "bell" : "smartphone"
                        }
                        size={20}
                        color={colors.primary}
                      />
                      <Text className="text-base ml-3">{option.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>

        <View className="mt-4">
          <Controller
            name="message"
            control={form.control}
            rules={{ required: true }}
            render={({ field }) => (
              <View className="bg-white border border-input-border p-3 rounded-lg flex">
                <TextInput
                  placeholder="Type your message here..."
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  value={field.value}
                  cursorColor={colors.primary}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={3}
                  className="text-lg font-mada-regular max-h-32 flex-1"
                />
              </View>
            )}
          />
        </View>

        <View className="mt-4">
          <Controller
            name="urls"
            control={form.control}
            render={({ field }) => (
              <MultiUrlInput
                urls={field.value || []}
                onUrlsChange={field.onChange}
              />
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

        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={onClose}
            className="bg-gray-200 py-3 px-4 rounded-xl flex-row items-center justify-center flex-1 mr-2 h-12"
          >
            <Feather
              name="x"
              size={18}
              color="gray"
              style={{ marginRight: 8 }}
            />
            <Text className="text-gray-700 font-mada-semibold text-sm">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={form.handleSubmit(handleFormSubmit)}
            disabled={isPending}
            className={`${
              isPending ? "bg-primary/50" : "bg-primary"
            } rounded-xl py-3 px-4 flex-row items-center justify-center flex-1 ml-2 h-12`}
          >
            {isPending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Feather
                  name="send"
                  size={18}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white font-mada-Bold text-sm">Send</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationForm;
