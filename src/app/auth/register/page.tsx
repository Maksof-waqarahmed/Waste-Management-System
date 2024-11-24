import RegistrationForm from "@/components/auth/userRegistrationForm";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import logo from "../../../assets/Images/logo.png";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row lg:p-0 p-5 items-center justify-evenly">
      <div className="w-full p-4 md:w-[60%] md:h-[800px] hidden lg:block">
        <Image
          src={logo}
          width={150}
          height={44}
          alt=""  
        />

        <h1 className="md:text-3xl text-xl font-bold  md:pl-10 text-justify	">
          Join Our Waste Management System – Make Your Environment Cleaner!
        </h1>
        <p className="mb-3 md:pl-10 font-semibold md:text-lg text-base text-justify	">
          Become an active part of the solution by joining our innovative waste
          management system. Not only will you be helping the planet, but you
          can also earn rewards for your contributions! Here’s how easy it is to
          make a positive impact:
        </p>
        <h2 className="text-xl font-bold mb-3 md:pl-10 line-clamp-3 text-justify ">
          How It Works:
        </h2>
        <ul className="list-disc list-inside space-y-2 md:pl-10 md:text-lg text-justify	">
          <li>
            <strong>Snap & Upload:</strong> Spot any waste around you? Just take
            a picture, upload it, and let our system do the rest! Using
            cutting-edge AI technology, we'll detect and classify the type of
            waste.
          </li>
          <li>
            <strong>Earn Points:</strong> For every valid waste submission,
            you’ll earn points, which can be redeemed for amazing rewards like
            gift cards, discounts, and eco-friendly products.
          </li>
          <li>
            <strong>Admin Review & Collection:</strong> Our dedicated team will
            review your submission and ensure prompt waste collection from the
            exact location you provided.
          </li>
          <li>
            <strong>Track Progress:</strong> You can track your submissions and
            see the impact you’re making. Stay motivated by watching your points
            grow!
          </li>
          <li>
            <strong>Leaderboard Feature:</strong> OCheck out our leaderboard to
            see how you rank compared to other contributors. The more waste you
            report, the higher you climb! Compete with others to become the top
            "Eco-Champion" and inspire others to follow in your footsteps.
          </li>
        </ul>
      </div>

      <div className="w-full md:w-auto">
        <Card className="p-8 rounded-2xl max-w-[550px] w-full font-heading">
          <div className="flex items-center">
            <Image
              src={logo}
              width={120}
              height={44}
              alt=""
              className="mt-[-20px] ml-[-27px]"
            />
            <h3 className="md:text-3xl font-bold mb-5 text-[#027C05] text-2xl">
              Waste Management System
            </h3>
          </div>
          <RegistrationForm />
        </Card>
      </div>
    </div>
  );
};

export default Page;
