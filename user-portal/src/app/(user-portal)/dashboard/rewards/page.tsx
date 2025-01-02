import RewardsPage from "@/components/userPortal/rewards/rewards-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rewards | Waste Management System",
  description: "View your reward balance and available rewards",
}

export default function RewardsPageWrapper() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-green-600">
        Rewards
      </h1>
      <RewardsPage />
    </div>
  )
}
