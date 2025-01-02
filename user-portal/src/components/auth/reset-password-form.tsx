"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { api } from "@/trpc-server/react";
import { Card } from "../ui/card";
import PasswordInput from "../password-input";
import { resetPasswordSchema } from "@/schemas";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Loader from "../loader/page";
import { z } from "zod";
import toast from "react-hot-toast";

type UserFormValue = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: ResetPassword, isLoading } = api.userAuth.ResetPassword.useMutation();
  const { mutateAsync: checkToken } = api.userAuth.CheckToken.useMutation({
    onSuccess: () => {
      setIsValidToken(true);
      setLoading(false);
    },
    onError: () => {
      setIsValidToken(false);
      setLoading(false);
    },
  });

  const params = useParams();
  const token = params.token as string | undefined;

  const form = useForm<UserFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          await checkToken({ token });
        }
      } catch (error) {
        console.error(error);
      }
    };
    validateToken();
  }, [token]);

  const onSubmit = async (data: UserFormValue) => {
    try {
      await ResetPassword({
        newPassword: data.password,
        token: token!,
      });
      form.reset({ confirmPassword: "", password: "" });
      setSubmitted(true);
      toast.success("Password reset successfully.");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!isValidToken ? (
        <Card className="center max-h-[350px] text-center p-4">
          <span className="icon-[noto--cross-mark] text-7xl"></span>
          <p className="mt-1 text-base text-red-500">
            The password reset link you used has expired. For security reasons,
            reset links are only valid for a limited time. Please request a new link.
          </p>
          <a
            href="/auth/login"
            className="m-auto mt-5 block w-[150px] rounded-md bg-primary p-2 text-white"
          >
            Back to login
          </a>
        </Card>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            {submitted && (
              <div className="w-full p-2 text-center rounded-lg shadow-md border-2 border-green-600">
                <p className="my-2 text-sm text-gray-500 md:text-lg">
                  Password has been successfully reset.
                </p>
              </div>
            )}
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Confirm Password</FormLabel>
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

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="fill-[#027C05]" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Submit
            </Button>

            <a
              className="flex items-center justify-center underline font-semibold text-lg"
              href="/auth/login"
            >
              Back to Login
            </a>
          </form>
        </Form>
      )}
    </>
  );
};

export default ResetPasswordForm;
