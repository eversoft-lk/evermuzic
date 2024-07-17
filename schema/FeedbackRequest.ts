import { z } from "zod";

export const FeedbackRequest = z.object({
  name: z.string(),
  email: z.string(),
  feedback: z.string(),
});

export type FeedbackRequestType = z.infer<typeof FeedbackRequest>;
