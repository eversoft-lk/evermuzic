import { z } from "zod";

export const NotifyMeRequest = z.object({
  name: z.string().min(3).max(60),
  email: z.string().email(),
});

export type NotifyMeRequestType = z.infer<typeof NotifyMeRequest>;
