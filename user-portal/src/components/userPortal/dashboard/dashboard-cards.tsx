"use client";
import { Reports, Leaderboard, Rewards } from "@prisma/client";
import { Coins, Medal, Trash2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { totalRewards } from "@/lib/utils";

interface Data {
  data: any;
}
export default function DashboardCards({ data }: Data) {
  let totalWeight = 0;
  if (data.collectedWaste.length > 0) {
    totalWeight = data.collectedWaste.reduce((total: number, item: Reports) => {
      return total + item.weight;
    }, 0);
  }

  const point = totalRewards(data.points);
  const cards = [
    {
      title: "Total Points",
      icon: Coins,
      value: point,
      description: `You've earned ${point} points this month`,
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Waste Collected",
      icon: Trash2,
      value: totalWeight + " kg",
      description: `You've collected ${totalWeight} kg this month`,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Leaderboard Position",
      icon: Medal,
      value: "#" +data.leaderBoard[0]?.rank || 0,
      description: `You're ranked #${data.leaderBoard[0]?.rank || 0} this month`,
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Recycling Rate",
      icon: TrendingUp,
      value: "75%", // If you have logic for recycling rate, you can calculate here
      description: "3% increase from last month",
      trend: "+3%",
      trendUp: true,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div
              className={`text-xs font-medium mt-2 ${
                card.trendUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {card.trend} {card.trendUp ? "↑" : "↓"}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
