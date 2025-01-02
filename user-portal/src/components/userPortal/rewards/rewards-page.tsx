"use client"

import React from "react"
import { RewardBalance } from "./reward-balance"
import { RecentTransactions } from "./recent-transactions"
import { AvailableRewards } from "./available-rewards"

const RewardsPage = () => {
  return (
    <div className="space-y-10">
      <RewardBalance balance={100} /> {/* Example balance */}
      <div className="grid gap-10 md:grid-cols-2">
        <RecentTransactions />
        <AvailableRewards />
      </div>
    </div>
  )
}

export default RewardsPage

