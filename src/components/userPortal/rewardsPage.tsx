import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Coins } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Images/logo.png";

const RewardsPage = () => {
  return (
    <div>
      <Card className="p-5 flex justify-between" style={{ boxShadow: "-7px 0 1px green" }}>
        <div>
          <CardTitle className="text-2xl">Reward Balance</CardTitle>
          <div className="flex space-x-3 items-center mt-5">
            <Coins size={50} className="text-green-600" />
            <div>
              <h1 className="text-green-600 font-bold text-5xl">0</h1>
              <p className="text-gray-500 font-semibold">Available Points</p>
            </div>
          </div>
        </div>
        <div>
          <Image src={logo} alt="" className="w-[130px]"/>
        </div>
      </Card>
    </div>
  );
};

export default RewardsPage;
