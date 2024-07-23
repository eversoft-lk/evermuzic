import { z } from "zod";

export const FeedbackRequest = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name is too short" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  feedback: z
    .string({ message: "Feedback is required" })
    .min(10, { message: "Feedback is too short" }),
});

export type FeedbackRequestType = z.infer<typeof FeedbackRequest>;
