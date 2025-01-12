import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(12, "Password must be less than 12 characters"),
});
