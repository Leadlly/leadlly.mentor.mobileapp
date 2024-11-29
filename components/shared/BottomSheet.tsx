import React, {
  useCallback,
  useRef,
  forwardRef,
  useMemo,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProps,
  useBottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface BottomSheetProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  snapPoints?: string[];
  button?: React.ReactNode;
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children, snapPoints = ["75%"], button, ...props }, ref) => {
    const { dismiss } = useBottomSheetModal();

    // Memoize snap points
    const points = useMemo(() => snapPoints, []);

    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          dismiss();
        }
      },
      [dismiss]
    );

    // Render backdrop
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      []
    );

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if ((ref as React.RefObject<BottomSheetModal>).current?.close) {
            dismiss();
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }, [dismiss]);

    return (
      <>
        {button && (
          <TouchableOpacity
            onPress={() =>
              (ref as React.RefObject<BottomSheetModal>).current?.present()
            }
          >
            {button}
          </TouchableOpacity>
        )}
        <BottomSheetModal
          ref={ref}
          index={0}
          snapPoints={points}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          {...props}
        >
          <BottomSheetView style={styles.contentContainer}>
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default BottomSheet;
