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
import PasswordInput from "../password-input";
import Link from "next/link";
import { api } from "@/trpc-server/react";
import { registerSchema } from "@/schemas";

type UserFormValue = z.infer<typeof registerSchema>;

const RegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const { mutateAsync: createUser, isLoading } =
    api.userAuth.create.useMutation();

  const { mutateAsync: sendEmailAgain } =
    api.userAuth.sendAgainEmail.useMutation();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function onSubmit(data: UserFormValue) {
    try {
      const res = await createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phoneNo: data.phoneNo,
      });
      setUserEmail(data.email);
      form.reset();
      setIsSubmitted(true);
    } catch (error: any) {
      if (
        error?.data?.code === "BAD_REQUEST" &&
        error?.message === "Email is already in use"
      ) {
        form.setError("email", {
          message:
            "This email is already registered. Please try a different email.",
        });
      } else {
        console.error("Unexpected error", error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {isSubmitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-green-700 mb-2">
              Welcome to WMS!
            </h1>
            <p className="text-lg text-green-600 mb-4">
              Thank You for Registering!
            </p>
            <p className="text-gray-600 mb-4">
              We've sent a verification email to your inbox. Please check your email and click the verification link to activate your account.
            </p>
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={async () => {
                  await sendEmailAgain({ email: userEmail });
                }}
                className="text-green-700 underline hover:no-underline"
              >
                resend the verification link
              </button>
              .
            </p>
            <Link
              href="/auth/login"
              className="mt-4 inline-block font-semibold text-green-700 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      onChange={field.onChange}
                      value={field.value}
                    //   className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-green-700 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        )}
      </form>
    </Form>
  );
};

export default RegistrationForm;

