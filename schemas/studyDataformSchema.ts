import { z } from "zod";

export const StudyDataFormSchema = z.object({
  chapterName: z
    .object({
      _id: z.string({ required_error: "Please select a chapter!" }),
      name: z.string({ required_error: "Please select a chapter!" }),
    })
    .nullable(),
  topicNames: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: "Please select at least one topic" })
    .default([]),
});
