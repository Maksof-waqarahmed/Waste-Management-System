"use client";
import React, { useEffect, useState } from "react";
import Loader from "../loader/page";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ searchParams }: any) => {
  const { token } = searchParams;
  const [loading, setLoader] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`/api/verification`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token}),
        });
        console.log("Res", response)
        setIsVerified(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }

    if (token) {
      verifyEmail();
    }
  }, [token]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        isVerified && (
          <Card className="w-full max-w-lg rounded-2xl p-5 text-center">
            <div>
              <span className="icon-[icon-park-outline--success] text-[100px] text-primary"></span>
            </div>
            <CardTitle className="mb-2 mt-4 text-center text-2xl font-bold">
              Verified Successfully
            </CardTitle>
            <Button
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Back To Login
            </Button>
          </Card>
        )
      )}
    </>
  );
};

export default VerifyEmail;
