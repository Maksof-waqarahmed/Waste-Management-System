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
import { registerSchema } from "@/app/auth/auth-schema";
import { Card } from "../ui/card";

type UserFormValue = z.infer<typeof registerSchema>;

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  async function onSubmit(data: UserFormValue) {
    // const hashPassword = await bcrypt.hash(data.password, 10);
    // data.password = hashPassword;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }
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
        {isSubmitted && (
          <div className="w-full p-2 text-center  rounded-lg shadow-md border-2 border-green-600">
          <h1 className="text-[25px] font-bold text-green-700">
            Welcome to WMS!
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Thank You for Registering!
          </p>
          <p className="my-3 text-sm text-gray-500">
            Didn’t receive the email? Check your spam folder or{" "}
            <a href="/resend-verification" className="text-green-700 underline text-lg">
              resend the verification link
            </a>
            .
          </p>
          <a href="/auth/login" className="mt-2 inline-block">
            <button className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
              Back to Login
            </button>
          </a>
        </div>
        )}

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
