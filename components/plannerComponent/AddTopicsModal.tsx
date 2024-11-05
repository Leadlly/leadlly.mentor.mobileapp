import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Plus } from "lucide-react-native";
import { colors } from "@/constants/constants";
import { useStudentData } from "@/helpers/Hooks/StudentDataHook";
import { AntDesign } from "@expo/vector-icons";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { StudyDataFormSchema } from "@/schemas/studyDataformSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../shared/Select";
import {
  useGetChapterTopics,
  useGetSubjectChapters,
} from "@/services/queries/questionQuery";
import MultiSelect from "../shared/MultiSelect";
import { capitalizeFirstLetter } from "@/helpers/utils";

const AddTopicsModal = () => {
  const { student, isError, isSuccess, error, isLoading } = useStudentData();
  const [activeSubject, setActiveSubject] = useState<string | null>(
    student?.academic?.subjects?.[0]?.name || null
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const form = useForm<z.infer<typeof StudyDataFormSchema>>({
    resolver: zodResolver(StudyDataFormSchema),
  });

  const {
    data: chapterData,
    isLoading: chaptersLoading,
    isFetching: chaptersFetching,
    refetch: refetchChapter,
  } = useGetSubjectChapters(activeSubject!, student.academic.standard!);

  const selectedChapter = form.watch("chapterName");

  const {
    data: topicsData,
    isFetching: topicsFetching,
    isLoading: topicsLoading,
    refetch: refetchTopics,
  } = useGetChapterTopics(
    activeSubject!,
    selectedChapter?.name || "",
    student.academic.standard!
  );

  useEffect(() => {
    form.setValue("chapterName", null);
    refetchChapter();
  }, [activeSubject, refetchChapter, form.setValue]);

  useEffect(() => {
    form.setValue("topicNames", []);
    refetchTopics();
  }, [activeSubject, selectedChapter, refetchTopics, form.setValue]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        className="bg-primary/10 rounded-full p-2"
      >
        <Plus size={20} color={colors.primary} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["80%"]}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-6">
              {student.academic.subjects?.map((subject) => (
                <Pressable
                  key={subject?.name}
                  onPress={() => setActiveSubject(subject?.name)}
                  className={clsx(
                    "flex-1 h-10 items-center justify-center",
                    activeSubject === subject?.name &&
                      "border-b-2 border-primary"
                  )}
                >
                  <Text
                    className={clsx(
                      "capitalize text-base font-mada-medium leading-tight text-tab-item-gray",
                      activeSubject === subject?.name && "text-primary"
                    )}
                  >
                    {subject?.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View className="space-y-6">
              <Controller
                name="chapterName"
                control={form.control}
                render={({ field }) => (
                  <Select
                    label="Chapter"
                    labelStyle="text-xl ml-1"
                    placeholder="Select a chapter"
                    items={
                      chapterData?.chapters.map((chapter) => ({
                        _id: chapter._id,
                        label: chapter.name,
                        value: chapter.name,
                      })) || []
                    }
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    loading={chaptersLoading}
                    fetching={chaptersFetching}
                  />
                )}
              />

              <Controller
                name="topicNames"
                control={form.control}
                render={({ field }) => (
                  <MultiSelect
                    label="Topics"
                    labelStyle="text-xl ml-1"
                    placeholder="Select topics"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    items={
                      topicsData?.topics.map((topic) => ({
                        _id: topic._id,
                        label: capitalizeFirstLetter(topic.name)!,
                        value: topic.name,
                      })) || []
                    }
                    loading={topicsLoading}
                    fetching={topicsFetching}
                    maxCount={3}
                  />
                )}
              />

              {/* Submit Button */}
              <View className="items-center justify-center mt-8">
                <TouchableOpacity className="bg-primary items-center justify-center w-24 h-11 rounded-lg">
                  <Text className="text-white text-sm font-mada-semibold leading-tight">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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

export default AddTopicsModal;
