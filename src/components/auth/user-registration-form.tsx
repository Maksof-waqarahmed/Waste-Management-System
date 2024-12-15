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
      form.reset({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phoneNo: "",
      });
      setIsSubmitted(true);
    } catch (error: any) {
      if (
        error?.data?.code === "BAD_REQUEST" &&
        error?.message === "Email is already in use"
      ) {
        form.setError("email", {
          message:
            "This email is already registered with us, please try again with a different email!",
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
        className="w-full md:space-y-5 space-y-1"
      >
        {isSubmitted && (
          <div className="w-full p-2 text-center  rounded-lg shadow-md border-2 border-green-600">
            <h1 className="md:text-[25px] text-xl font-bold text-green-700">
              Welcome to WMS!
            </h1>
            <p className="md:mt-2 mt-0 md:text-lg text-base text-gray-700">
              Thank You for Registering!
            </p>
            <p className="my-2 text-sm text-gray-500 md:text-lg">
              Didn’t receive the email? Check your spam folder or <br />
              <a
                href="/resend-verification"
                className="text-green-700 underline md:text-lg text-base"
                onClick={async () => {
                  await sendEmailAgain({ email: userEmail });
                  console.log("send Email")
                }}
              >
                resend the verification link
              </a>
              .
            </p>
            <a
              href="/auth/login"
              className="font-semibold hover:underline text-gray-500"
            >
              Back to Login
            </a>
          </div>
        )}

        <div className="">
          <div className="md:grid md:grid-cols-2 md:gap-x-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="md:md:mb-5 mb-2">
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
                <FormItem className="md:mb-5 mb-2">
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
                <FormItem className="md:mb-5 mb-2">
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
                <FormItem className="md:mb-5 mb-2">
                  <FormLabel>Phone No</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone No" {...field} />
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
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
