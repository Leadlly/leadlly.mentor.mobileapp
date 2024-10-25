import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";

const FilterModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={{ padding: 10 }}
      >
        <Image
          source={require("@/assets/images/filtericon.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
      <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Filter Options</Text>
          {/* Add filter options here */}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default FilterModal;
