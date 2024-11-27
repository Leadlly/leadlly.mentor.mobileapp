import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Linking,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { colors } from "@/constants/constants";
import { useAppDispatch } from "@/services/redux/hooks";
import { useMentorPersonalInfo } from "@/services/queries/userQuery";
import { useGetUser } from "@/services/queries/userQuery";
import { setUser } from "@/services/redux/slices/userSlice";
import { Feather } from "@expo/vector-icons";

const GMeetLinkFormSchema = z.object({
  gmeet: z
    .string({ required_error: "Please enter a valid Google Meet link!" })
    .url({ message: "Invalid Google Meet link" }),
});

interface GMeetInputLinkModalProps {
  visible: boolean;
  onClose: () => void;
}

const GMeetInputLinkModal: React.FC<GMeetInputLinkModalProps> = ({
  visible,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const mentorPersonalInfoMutation = useMentorPersonalInfo();
  const { data: userInfo, refetch: refetchUser } = useGetUser();

  const form = useForm<z.infer<typeof GMeetLinkFormSchema>>({
    resolver: zodResolver(GMeetLinkFormSchema),
  });

  const onLinkSubmit = async (data: z.infer<typeof GMeetLinkFormSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await mentorPersonalInfoMutation.mutateAsync(data);

      if (res.success === false) {
        alert("Saving Google Meet link failed: " + res.message);
        return;
      }

      await refetchUser();
      if (userInfo?.user) {
        dispatch(setUser(userInfo.user));
      }

      alert(res.message);
      onClose();
      form.reset();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateMeetingLink = () => {
    Linking.openURL("https://meet.google.com/new");
  };

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
            <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg">
              <Text className="text-2xl font-bold mb-4 text-primary">
                Submit your Google Meet link
              </Text>
              <TouchableOpacity
                className="flex-row items-center mb-5"
                onPress={handleCreateMeetingLink}
              >
                <Feather name="plus-circle" size={18} color={colors.primary} />
                <Text className="ml-2 text-primary text-base">Create Meeting Link</Text>
              </TouchableOpacity>
              <Controller
                control={form.control}
                name="gmeet"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="mb-5">
                    <Text className="text-base font-semibold mb-2 text-gray-700">
                      Google Meet Link
                    </Text>
                    <TextInput
                      placeholder="Enter the Google Meet link"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="border border-gray-300 rounded-lg p-3 text-base"
                    />
                    {form.formState.errors.gmeet && (
                      <Text className="text-red-500 mt-1 text-sm">
                        {form.formState.errors.gmeet.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <TouchableOpacity
                onPress={form.handleSubmit(onLinkSubmit)}
                disabled={isSubmitting}
                className={`bg-primary rounded-lg py-4 items-center mb-3 ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                <Text className="text-white text-lg font-semibold">
                  {isSubmitting ? "Submitting..." : "Submit Link"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                className="bg-gray-200 rounded-lg py-4 items-center"
              >
                <Text className="text-gray-700 text-lg font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GMeetInputLinkModal;
