"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Crown, Medal, Trophy } from "lucide-react";
import { LeaderBoardEntry } from "./leader-board-entry";
import { Pagination } from "@/components/ui/pagination";
import { api } from "@/trpc-server/react";

const LeaderBoard = () => {
  const { data } = api.leaderBoard.getLeaderBoard.useQuery();
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader className="bg-green-600 p-4">
        <CardTitle className="flex items-center justify-between text-white">
          <Trophy className="h-6 w-6" />
          <span>Top Performers</span>
          <Award className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 mb-4">
          <div>RANK</div>
          <div>USER</div>
          <div>POINTS</div>
          <div>LEVEL</div>
        </div>
        {data.map((entry, index) => (
          <LeaderBoardEntry
            key={entry.id}
            rank={entry.rank}
            score={entry.score}
            user={entry.user}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default LeaderBoard;
