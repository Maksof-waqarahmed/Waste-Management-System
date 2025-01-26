"use client";

import React from "react";
import { RewardBalance } from "./reward-balance";
import { RecentTransactions } from "./recent-transactions";
import { AvailableRewards } from "./available-rewards";
import { useUser } from "@/lib/user-context";
import SkeletonRewards from "@/app/(user-portal)/dashboard/rewards/skeleton";
import { totalRewards } from "@/lib/utils";

const RewardsPage = () => {
  const { user } = useUser();
  if (!user) return <SkeletonRewards />;
  const points = totalRewards(user.reward);
  return (
    <div className="space-y-10">
      <RewardBalance balance={points} />
      <div className="grid gap-10 md:grid-cols-2">
        <RecentTransactions />
        <AvailableRewards />
      </div>
    </div>
  );
};

export default RewardsPage;
