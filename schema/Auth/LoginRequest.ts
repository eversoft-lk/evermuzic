import { z } from "zod";

export const LoginRequest = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});

export type LoginRequestType = z.infer<typeof LoginRequest>;
