import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LeaderSkeleton = () => {
  return (
    <div className="">
      <Skeleton className="h-[550px] w-full mb-4" />
    </div>
  );
};

export default LeaderSkeleton;
