import { z } from "zod";

export const RegisterRequest = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" })
    .regex(new RegExp(/^[a-zA-Z0-9.]+$/), {
      message: "Username must be lowercase letters and numbers only.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), {
      message: "Your password is not strong enough",
    }),
});

export type RegisterRequestType = z.infer<typeof RegisterRequest>;
