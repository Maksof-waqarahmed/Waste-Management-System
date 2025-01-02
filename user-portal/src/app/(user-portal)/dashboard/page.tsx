import React from "react";
import { Metadata } from "next";
import DashboardCards from "@/components/userPortal/dashboard/dashboard-cards";
import DashboardCharts from "@/components/userPortal/dashboard/dashboard-charts";
import DashboardTable from "@/components/userPortal/dashboard/dashboard-table";

export const metadata: Metadata = {
  title: "Dashboard | Waste Management System",
  description: "Overview of your waste management activities and rewards",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-green-600">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Waste Management Dashboard, <span className="text-green-600 font-bold text-lg">Waqar Rana</span> 
        </p>
      </div>
      <DashboardCards />
      <DashboardCharts />
      <DashboardTable />
    </div>
  );
}
