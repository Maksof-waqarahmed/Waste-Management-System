import CollectedWaste from "@/components/userPortal/collected-waste/collected-waste"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collected Waste | Waste Management System",
  description: "View and manage collected waste tasks",
}

export default function CollectedWastePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-green-600">
        Waste Collection Tasks
      </h1>
      <CollectedWaste />
    </div>
  )
}

