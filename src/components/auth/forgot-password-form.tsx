"use client";
import React from "react";
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
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { api } from "@/trpc-server/react";
import { forgotPasswordSchema } from "@/schemas";

type UserFormValue = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: forgotPassword, isLoading } =
    api.userAuth.forgotPassword.useMutation();
  const form = useForm<UserFormValue>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  async function onSubmit(data: UserFormValue) {
    try {
      await forgotPassword({
        email: data.email,
      });
      form.reset({ email: "" });
      setLoading(true);
      setIsSubmitted(true);
    } catch (error: any) {
      if (
        error.message === "Email not found" &&
        error.data.code === "BAD_REQUEST"
      ) {
        form.setError("email", {
          message: "Email not found please try again with valid email.",
        });
      } else {
        console.error("System Error");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        {isSubmitted && (
          <div className="w-full p-2 text-center rounded-lg shadow-md border-2 border-green-600">
            <h1 className="md:text-[20px] text-lg font-bold text-green-700">
              Password Reset Email Sent!
            </h1>
            <p className="md:mt-2 mt-0 md:text-base text-sm text-gray-700">
              We have successfully sent a password reset email.
            </p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className="fill-[#027C05]" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          Submit
        </Button>
        <a
          className=" flex items-center justify-center underline font-semibold text-lg"
          href="/auth/login"
        >
          Back to Login
        </a>
      </form>
    </Form>
  );
};

export default ForgotPassword;
