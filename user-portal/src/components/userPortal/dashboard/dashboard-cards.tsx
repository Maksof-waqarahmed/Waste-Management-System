"use client";

import { Coins, Medal, Trash2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  {
    title: "Total Points",
    icon: Coins,
    value: "203",
    description: "You've earned 12 points this month",
    trend: "+5%",
    trendUp: true,
  },
  {
    title: "Waste Collected",
    icon: Trash2,
    value: "500 kg",
    description: "You've collected 80 kg this month",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Leaderboard Position",
    icon: Medal,
    value: "#5",
    description: "You're ranked #5 this month",
    trend: "+2",
    trendUp: true,
  },
  {
    title: "Recycling Rate",
    icon: TrendingUp,
    value: "75%",
    description: "3% increase from last month",
    trend: "+3%",
    trendUp: true,
  },
];

export default function DashboardCards() {
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
