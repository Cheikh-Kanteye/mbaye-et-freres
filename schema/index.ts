import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens"
    )
    .nonempty("Name is required"),

  email: z
    .string()
    .email("Email must be valid")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email cannot exceed 100 characters")
    .nonempty("Email is required"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message cannot exceed 1000 characters")
    .nonempty("Message is required"),
});
