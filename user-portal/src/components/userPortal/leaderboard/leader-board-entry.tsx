import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Crown, Medal } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
  profileImg: string | null;
}
interface LeaderBoardEntryProps {
  rank: number;
  user: User;
  score: number;
}
const checkLevel = (score: number) => {
  const thresholds = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];
  return thresholds.findIndex((threshold) => score > threshold) + 1 || 10;
};

export const LeaderBoardEntry: React.FC<LeaderBoardEntryProps> = ({
  rank,
  user: { firstName, lastName, profileImg },
  score,
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <span className="font-semibold text-white rounded-full bg-green-600 p-2">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 items-center py-4 border-t border-gray-200">
      <div>{getRankIcon(rank)}</div>
      <div className="flex items-center md:flex-row flex-col text-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profileImg || ""} alt={firstName} />
          <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium ">{firstName + " " + lastName}</span>
      </div>
      <div className="flex items-center">
        <Award className="h-5 w-5 text-purple-500 mr-2" />
        <span className="font-medium">{score}</span>
      </div>
      <div>
        <Badge
          variant="secondary"
          className="bg-blue-100 text-center text-blue-600"
        >
          Level {checkLevel(score)}
        </Badge>
      </div>
    </div>
  );
};
