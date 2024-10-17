"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/Images/logo.png";
import { Card, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Coins, Medal, Trash2 } from "lucide-react";

const DashboardPage = () => {
  return (
    <>
      <Card className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {/* First div: Total Points */}
        <div className="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Badge variant={"coin"}>
              <Coins className="w-16 h-16 text-white" />
            </Badge>
            <div className="ml-4 flex-1 text-right">
              <CardTitle className="text-xl">Total Points</CardTitle>
              <p className="text-green-600 text-3xl mt-2 font-bold">203</p>
            </div>
          </div>
          <p className="text-center mt-3 font-semibold">
            You've earned 12 points this month
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Badge variant={"coin"}>
              <Coins className="w-16 h-16 text-white" />
            </Badge>
            <div className="ml-4 flex-1 text-right">
              <CardTitle className="text-xl">Total Points</CardTitle>
              <p className="text-green-600 text-3xl mt-2 font-bold">203</p>
            </div>
          </div>
          <p className="text-center mt-3 font-semibold">
            You've earned 12 points this month
          </p>
        </div>

        <div className="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Badge variant={"coin"}>
              <Trash2 className="w-16 h-16 text-white" />
            </Badge>
            <div className="ml-4 flex-1 text-right">
              <CardTitle className="text-xl">Total Waste Collected</CardTitle>
              <p className="text-green-600 text-3xl mt-2 font-bold">500 kg</p>
            </div>
          </div>
          <p className="text-center mt-3 font-semibold">
            You've collected 80 kg this month
          </p>
        </div>

        <div className="p-4 bg-green-100 rounded-xl flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <Badge variant={"coin"}>
              <Medal className="w-16 h-16 text-white" />
            </Badge>
            <div className="ml-4 flex-1 text-right">
              <CardTitle className="text-xl">Leaderboard Position</CardTitle>
              <p className="text-green-600 text-3xl mt-2 font-bold">#5</p>
            </div>
          </div>
          <p className="text-center mt-3 font-semibold">
            You're ranked #5 this month
          </p>
        </div>
      </Card>
    </>
  );
};

export default DashboardPage;
