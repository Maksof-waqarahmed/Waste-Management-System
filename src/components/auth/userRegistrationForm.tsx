"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../passwordInput";
import Link from "next/link";
import bcrypt from "bcrypt";

const formSchema = z.object({
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

type UserFormValue = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  async function onSubmit(data: UserFormValue) {
    // const hashPassword = await bcrypt.hash(data.password, 10);
    // data.password = hashPassword;

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
      const result = await res.json();
      console.log("User created:", result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Phone No</FormLabel>
                <FormControl>
                  <Input placeholder="Phone No" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div>
          <p className="text-l text-center">
            Already have an account?
            <span>
              <Link
                href="/auth/login"
                className="text-sm text-green-700 font-semibold text-left underline hover:no-underline"
              >
                Login
              </Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
