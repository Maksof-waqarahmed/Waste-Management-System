import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import logo from "../../../assets/Images/logo.png";
import LoginForm from "@/components/auth/user-login-form";
const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-300 to-green-100">
      <Card className="p-8 rounded-2xl max-w-[550px] w-full font-heading md:m-10 m-5">
        <div className="flex items-center">
          <Image
            src={logo}
            width={120}
            height={44}
            alt=""
            className="mt-[-20px] ml-[-27px] w-20 h-20 md:w-[120px] md:h-[120px]"
          />
          <h3 className="md:text-3xl font-bold mb-5 text-[#027C05] text-xl">
            Waste Management System
          </h3>
        </div>
        <h3 className="md:text-3xl font-bold mb-5 text-green-700 text-xl">
          Welcome Back
        </h3>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Page;
