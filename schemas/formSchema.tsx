import { z } from "zod";

export const FormSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .length(10, { message: "Phone number should be exactly 10 characters" })
    .regex(/^\d+$/, { message: "Phone number should only contain digits" }),
  gender: z.enum(["male", "female", "other"]),
  class: z.enum(["11", "12", "13"]),
  course: z.enum(["JEE", "NEET"]),
  schedule: z.string().min(1, "Please select a schedule option."),
});
