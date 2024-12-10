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
import PasswordInput from "../password-input";
import Link from "next/link";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Invalid email format, Please enter a valid email address.",
  }),
});

type UserFormValue = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  function onSubmit(data: UserFormValue) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
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
        <Button type="submit" className="w-full">
          Forgot Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
