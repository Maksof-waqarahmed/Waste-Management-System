"use client";
import React from "react";
import { Metadata } from "next";
import DashboardCards from "@/components/userPortal/dashboard/dashboard-cards";
import DashboardCharts from "@/components/userPortal/dashboard/dashboard-charts";
import DashboardTable from "@/components/userPortal/dashboard/dashboard-table";
import { api } from "@/trpc-server/react";

// export const metadata: Metadata = {
//   title: "Dashboard | Waste Management System",
//   description: "Overview of your waste management activities and rewards",
// };

export default function Dashboard() {
  const { data } = api.userAuth.getCurrentUser.useQuery();
  if (!data) {
    return <div>Loading</div>;
  }
  const data1 = {
    collectedWaste: data?.report || [],
    leaderBoard: data?.leaderboard || [],
    points: data?.reward || [],
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-green-600">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome to your Waste Management Dashboard,{" "}
          <span className="text-green-600 font-bold text-lg">{`${data?.firstName}  ${data?.lastName}`}</span>
        </p>
      </div>
      <DashboardCards data={data1} />
      <DashboardCharts />
      <DashboardTable data={data.report} />
    </div>
  );
}
