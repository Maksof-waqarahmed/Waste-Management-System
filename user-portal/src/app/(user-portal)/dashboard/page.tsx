"use client";
import React from "react";
import DashboardCards from "@/components/userPortal/dashboard/dashboard-cards";
import DashboardCharts from "@/components/userPortal/dashboard/dashboard-charts";
import DashboardTable from "@/components/userPortal/dashboard/dashboard-table";
import { useUser } from "@/lib/user-context";
import SkeletonUI from "@/app/(user-portal)/dashboard/skeleton";

export default function Dashboard() {
  const { user } = useUser();
  if (!user) {
    return <SkeletonUI />;
  }
  const data1 = {
    collectedWaste: user?.report || [],
    leaderBoard: user?.leaderboard || [],
    points: user?.reward || [],
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-green-600">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your Waste Management Dashboard,{" "}
          <span className="text-green-600 font-bold text-lg">{`${user?.firstName}  ${user?.lastName}`}</span>
        </p>
      </div>
      <DashboardCards data={data1} />
      <DashboardCharts />
      <DashboardTable data={user.report} />
    </div>
  );
}
