import { Award, Crown, Medal, Trophy, TrophyIcon, User } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const LeaderBoard = () => {
  return (
    <div className="w-full bg-white">
      <Card>
        <div className="bg-green-600 p-4 flex justify-between items-center">
          <TrophyIcon className="text-white w-6 h-6" />
          <h2 className="text-white font-semibold text-lg">Top Performers</h2>
          <Award className="text-white w-6 h-6" />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 text-gray-500 font-medium text-sm mb-2">
            <div>RANK</div>
            <div>USER</div>
            <div>POINTS</div>
            <div>LEVEL</div>
          </div>

          <div className="grid grid-cols-4 items-center text-gray-700 border-t border-gray-200 py-2">
            <div className="mt-4">
              <Crown className="text-yellow-500 w-5 h-5" />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <User className="w-6 h-6 text-gray-400" />
              <span className="font-medium">Mends Albert</span>
            </div>

            <div className="mt-4">
              <Award className="text-purple-500 w-5 h-5 inline-block mr-1" />
              <span className="font-medium">54</span>
            </div>

            <div className="mt-4">
              <Badge className="bg-blue-100 text-blue-600 hover:text-white text-xs font-semibold rounded-full p-2">
                Level 1
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LeaderBoard;
