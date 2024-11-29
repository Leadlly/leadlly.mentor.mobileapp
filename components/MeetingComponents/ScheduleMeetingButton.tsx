import React, { useCallback, useRef } from "react";
import { TouchableOpacity, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../shared/BottomSheet";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/constants";
import ScheduleMeetingForm from "./ScheduleMeetingForm";

const ScheduleMeetingButton = ({ studentId }: { studentId: string }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <>
      <TouchableOpacity
        className="bg-primary/10 border border-primary py-3 rounded-lg flex-1 flex justify-between flex-row px-5"
        onPress={handlePresentModalPress}
      >
        <Text className="text-primary font-mada-semibold">
          Schedule New Meeting
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color={colors.primary}
        />
      </TouchableOpacity>

      <BottomSheet ref={bottomSheetModalRef} snapPoints={["70%"]}>
        <ScheduleMeetingForm  studentIds={studentId} onClose={handleClose} />
      </BottomSheet>
    </>
  );
};

export default ScheduleMeetingButton;
