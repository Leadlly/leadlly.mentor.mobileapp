import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/constants/constants";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

const CreateBatchFromSchema = z.object({
  standard: z.string(),
  batchName: z.string(),
  subject: z.string(),
});

const AddClasses = () => {
  const form = useForm<z.infer<typeof CreateBatchFromSchema>>({
    resolver: zodResolver(CreateBatchFromSchema),
  });
  return (
    <ScrollView className="flex-1 bg-white px-4">
      <View className="bg-primary/10 rounded-xl p-4 mt-4">
        <Text
          style={{ fontSize: moderateScale(18) }}
          className="font-mada-semibold text-center"
        >
          Create New Batch
        </Text>

        <View className="bg-white rounded-lg p-5 mt-4 space-y-3">
          <View>
            <Controller
              name="standard"
              control={form.control}
              render={({ field }) => (
                <View>
                  <Text
                    className="font-mada-medium"
                    style={{ fontSize: moderateScale(15) }}
                  >
                    Standard
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    {["11", "12", "13"].map((item) => (
                      <TouchableOpacity
                        key={item}
                        className="flex-row items-center gap-x-1"
                        onPress={() => field.onChange(item)}
                      >
                        <View
                          style={{
                            width: horizontalScale(14),
                            height: horizontalScale(14),
                          }}
                          className="border border-primary rounded-full items-center justify-center"
                        >
                          <View
                            style={{
                              width: horizontalScale(10),
                              height: horizontalScale(10),
                            }}
                            className={clsx(
                              "rounded-full",
                              field.value === item ? "bg-primary" : ""
                            )}
                          />
                        </View>
                        <Text
                          style={{ fontSize: moderateScale(13) }}
                          className="font-mada-regular"
                        >
                          {item}th class
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>

          <View>
            <Controller
              name="batchName"
              control={form.control}
              render={({ field }) => (
                <View>
                  <Text
                    className="font-mada-medium"
                    style={{ fontSize: moderateScale(15) }}
                  >
                    Batch Name
                  </Text>

                  <View className="flex-row items-center gap-3 flex-wrap mt-2">
                    {["omega", "sigma"].map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => field.onChange(item)}
                        className="border border-input-border rounded-lg"
                        style={{
                          paddingHorizontal: horizontalScale(24),
                          paddingVertical: verticalScale(8),
                        }}
                      >
                        <Text
                          style={{ fontSize: moderateScale(13) }}
                          className="font-mada-regular capitalize"
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>

          <View>
            <Controller
              name="subject"
              control={form.control}
              render={({ field }) => (
                <View>
                  <Text
                    className="font-mada-medium"
                    style={{ fontSize: moderateScale(15) }}
                  >
                    Subject
                  </Text>

                  <View className="flex-row items-center gap-3 flex-wrap mt-2">
                    {["mathematics", "physics", "chemistry"].map((item) => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => field.onChange(item)}
                        className="border border-input-border rounded-lg"
                        style={{
                          paddingHorizontal: horizontalScale(24),
                          paddingVertical: verticalScale(8),
                        }}
                      >
                        <Text
                          style={{ fontSize: moderateScale(13) }}
                          className="font-mada-regular capitalize"
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            className="bg-primary rounded-lg items-center justify-center"
            style={{ height: verticalScale(36) }}
          >
            <Text
              style={{ fontSize: moderateScale(13) }}
              className="font-mada-semibold text-white text-center"
            >
              Create Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddClasses;
