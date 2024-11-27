import { z } from "zod";

export const FormSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .length(10, { message: "Phone number should be exactly 10 characters" })
    .regex(/^\d+$/, { message: "Phone number should only contain digits" }),
  gender: z.enum(["male", "female", "other"])
});

export const ScheduleMeetingFormSchema = z.object({
  date_of_meeting: z.date({
    required_error: "A date is required to schedule meeting.",
  }),
  time: z.string({ required_error: "A time is required to schedule meeting!" }),
  meeting_agenda: z
    .string({
      required_error: "Please enter your meeting agenda",
    })
    .min(20),
});
