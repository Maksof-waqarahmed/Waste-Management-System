import LeaderBoard from "@/components/userPortal/leaderboard/leader-board"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leaderboard | Waste Management System",
  description: "View top performers in waste management",
}

export default function LeaderBoardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-green-700">
        Leaderboard
      </h1>
      <LeaderBoard />
    </div>
  )
}
