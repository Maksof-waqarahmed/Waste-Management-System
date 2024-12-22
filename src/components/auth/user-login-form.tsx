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
import { userLoginSchema } from "@/schemas";
import { api } from "@/trpc-server/react";

type UserFormValue = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const { mutateAsync: login, isLoading } = api.userAuth.login.useMutation();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userLoginSchema),
    mode: "onChange",
  });

  async function onSubmit(data: UserFormValue) {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      });
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  }
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
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
        <a
          href="/auth/forgot-password"
          className="text-base font-medium text-green-700 underline hover:no-underline block text-end"
        >
          Forget password?{" "}
        </a>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div>
          <p className="text-l text-center">
            Don't have an account?
            <span>
              <Link
                href="/auth/register"
                className="text-sm text-green-700 font-semibold text-left underline	hover:no-underline"
              >
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
