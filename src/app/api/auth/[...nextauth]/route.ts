import NextAuth from "next-auth";
import { options } from "./option";

const handler = NextAuth(options);
export { handler as GET, handler as POST };

import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import bcrypt from "bcrypt";

const UserCreateSchema = z.object({
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

export function userRegister(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const result = UserCreateSchema.safeParse(req.body);
    console.log("Result", result);

    if (!result.success) {
      res.status(400).json({
        error: result.error.errors.map((e) => e.message),
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
