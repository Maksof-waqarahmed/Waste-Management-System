"use client";
import React, { useEffect, useState } from "react";
import Loader from "../loader/page";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc-server/react";

const VerifyEmail = () => {
  const {
    mutateAsync: emailVerify,
    error,
    isError,
  } = api.userAuth.verifyEmail.useMutation();
  const params = useParams();
  const token = params.token as string | undefined;
  const [loading, setLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();
console.log("Error", isError)
  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    emailVerify({ token })
      .then(() => {
        setIsVerified(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token, router]);

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <Card className="p-5 text-center">
          <Loader />
          <p className="mt-5 text-base text-gray-600">
            We are verifying your email address. Please wait a moment while we
            complete the process.
          </p>
        </Card>
      ) : isError ? (
        <Card className="w-full max-w-lg rounded-2xl p-5 text-center bg-red-50">
          <div>
            <span className="icon-[icon-park-outline--error] text-[100px] text-red-500"></span>
          </div>
          <CardTitle className="mb-2 mt-4 text-center text-2xl font-bold text-red-600">
            Verification Failed
          </CardTitle>
          <p className="mb-4 text-gray-600">
            We could not verify your email address. The verification token may
            have expired or is invalid.
          </p>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Back To Login
          </Button>
        </Card>
      ) : (
        isVerified && (
          <Card className="w-full max-w-lg rounded-2xl p-5 text-center">
            <div>
              <span className="icon-[icon-park-outline--success] text-[100px] text-green-500"></span>
            </div>
            <CardTitle className="mb-2 mt-4 text-center text-2xl font-bold text-green-700">
              Verified Successfully
            </CardTitle>
            <p className="mb-4">
              Your email address has been successfully verified. You can now log
              in to your account.
            </p>
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Back To Login
            </Button>
          </Card>
        )
      )}
    </div>
  );
};

export default VerifyEmail;
