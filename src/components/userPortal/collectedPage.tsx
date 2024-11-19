import React, { useState, useEffect } from "react";
import {
  Calendar,
  Search,
  BadgeCheck,
  Trash2,
  WeightIcon,
  MapPinned,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const CollectedWaste = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-x-3">
        <Input className="flex-1 bg-white" placeholder="Search by area" />
        <Button className="w-15 h-10">
          <Search />
        </Button>
      </div>
      <Card className="mt-10 p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <MapPinned />
            <p className="font-medium text-2xl">Orangi Town 10 Number</p>
          </div>
          <Badge className="bg-green-200 flex items-center">
            <BadgeCheck className="md:w-5 md:h-5 h-4 w-4 mr-1 text-green-900" />
            <span className="font-semibold text-sm text-green-900">
              Verified
            </span>
          </Badge>
        </div>
        <div className="grid grid-cols-3 mt-5">
          <div className="flex gap-x-1 items-center">
            <Trash2 className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              Mixed Waste
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <WeightIcon className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              Aspanproximately 100kg
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <Calendar className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              2024-03-11
            </span>
          </div>
        </div>
        <p className="text-end text-green-600 font-semibold">Reward Earned</p>
      </Card>
      <Card className="mt-10 p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <MapPinned />
            <p className="font-medium text-2xl">Orangi Town 10 Number</p>
          </div>
          <Badge className="bg-green-200 flex items-center">
            <BadgeCheck className="md:w-5 md:h-5 h-4 w-4 mr-1 text-green-900" />
            <span className="font-semibold text-sm text-green-900">
              Verified
            </span>
          </Badge>
        </div>
        <div className="grid grid-cols-3 mt-5">
          <div className="flex gap-x-1 items-center">
            <Trash2 className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              Mixed Waste
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <WeightIcon className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              Aspanproximately 100kg
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <Calendar className="text-gray-600 w-5 h-5" />
            <span className="text-base font-semibold text-gray-600">
              2024-03-11
            </span>
          </div>
        </div>
        <p className="text-end text-green-600 font-semibold">Reward Earned</p>
      </Card>
    </div>
  );
};

export default CollectedWaste;
