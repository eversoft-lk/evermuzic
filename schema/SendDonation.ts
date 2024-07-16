import { z } from "zod";

export const SendDonation = z.object({
  name: z.string().min(3, { message: "Name is too short" }),
  email: z.string().email(),
  amount: z.number().min(1, { message: "Are you a begger ?" }),
});

export type SendDonationType = z.infer<typeof SendDonation>;