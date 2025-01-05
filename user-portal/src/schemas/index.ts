import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string({ message: "First Name is required" })
    .min(2, { message: "Minimum 2 char required" }),
  lastName: z
    .string({ message: "Last Name is required" })
    .min(2, { message: "Minimum 2 char required" }),
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email format, Please enter a valid email address.",
  }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character",
    }),
  phoneNo: z
    .string({ message: "Phone No is required" })
    .regex(/^\d+$/, { message: "Phone no must contain only numbers" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords you entered do not match. Please try again.",
  });

export const forgotPasswordSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email format, Please enter a valid email address.",
  }),
});

export const userLoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email format, Please enter a valid email address.",
  }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const wasteSubmitSchema = z.object({
  location: z.string().min(1, "Location is required"),
  wasteType: z.string().min(1, "Waste type is required"),
  estimatedAmount: z.string().min(1, "Estimated amount is required"),
  weight: z.string(),
})