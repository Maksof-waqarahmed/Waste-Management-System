import { ReportWaste } from "@/components/userPortal/report-waste/report-waste";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Waste | Waste Management System",
  description: "Report waste for collection and recycling",
};

export default function ReportWastePage() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-green-600">
        Report Waste
      </h1>
      <ReportWaste />
    </div>
  );
}
