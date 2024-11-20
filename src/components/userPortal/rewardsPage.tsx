import React from "react";
import { Card, CardTitle } from "../ui/card";
import { ArrowBigDown, Coins, Info, MoveDownRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Images/logo.png";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

const RewardsPage = () => {
  return (
    <div>
      <Card
        className="p-5 flex justify-between"
        style={{ boxShadow: "-7px 0 1px green" }}
      >
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
          <Image src={logo} alt="" className="w-[130px]" />
        </div>
      </Card>
      <div className="w-full grid grid-cols-2 mt-9 gap-10">
        <div>
          <h1 className="text-3xl font-semibold mb-8">Recent Transactions</h1>
          <Card className="p-5">
            <div className="grid grid-cols-2 mb-3">
              <div className="flex gap-5">
                <MoveDownRight className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-lg font-semibold">Redeemed all points</p>
                  <p className="text-gray-500 font-semibold">2024-09-05</p>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <p className="font-semibold text-lg text-red-600">-10</p>
              </div>
            </div>
            <DropdownMenuSeparator className="mb-4" />
            <div className="grid grid-cols-2 mb-3">
              <div className="flex gap-5">
                <MoveUpRight className="w-5 h-5 text-green-600" />
                <div className="w-full">
                  <p className="text-lg font-semibold">Points earned reporting waste</p>
                  <p className="text-gray-500 font-semibold">2024-09-05</p>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <p className="font-semibold text-lg text-green-600">+10</p>
              </div>
            </div>
            <DropdownMenuSeparator className="mb-4" />
          </Card>
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-8">Available Rewards</h1>
          <Card
            className="p-5 bg-yellow-100"
            style={{ boxShadow: "-7px 0 1px rgba(204, 153, 0, 1)" }}
          >
            <div className="flex items-center gap-5">
              <Info className="text-yellow-400 w-7 h-7" />
              <p className="font-semibold text-xl text-yellow-700">
                No rewards available at the moment
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
