import RegistrationForm from "@/components/auth/user-registration-form";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import logo from "../../../assets/images/logo.png";

const Page = () => {
  return (
    <div className="min-h-screen  flex flex-col md:flex-row items-center justify-center p-5 md:p-10">
      <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0 md:pr-8">
        <Image
          src={logo}
          width={150}
          height={44}
          alt="Waste Management System Logo"
          className="mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Join Our Waste Management System
        </h1>
        <p className="text-lg text-green-700 mb-6">
          Make Your Environment Cleaner and Earn Rewards!
        </p>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-4">How It Works:</h2>
          <ul className="space-y-4">
            {[
              { title: "Snap & Upload", desc: "Take a picture of waste and let our AI classify it." },
              { title: "Earn Points", desc: "Get rewards for valid waste submissions." },
              { title: "Admin Review", desc: "Our team ensures prompt waste collection." },
              { title: "Track Progress", desc: "Monitor your impact and watch your points grow." },
              { title: "Leaderboard", desc: "Compete to become the top 'Eco-Champion'." },
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-green-800">{item.title}</h3>
                  <p className="text-green-600">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-3/5 md:pl-8">
        <Card className="p-8 rounded-2xl max-w-[550px] w-full mx-auto bg-white shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Image
              src={logo}
              width={80}
              height={80}
              alt="Waste Management System Logo"
              className="mr-4"
            />
            <h3 className="text-3xl font-bold text-green-700">
              Registration
            </h3>
          </div>
          <RegistrationForm />
        </Card>
      </div>
    </div>
  );
};

export default Page;
