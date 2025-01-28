import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeletonUI = () => {
  return (
    <div className="">
      <Skeleton className="h-44 w-full mb-4" />
      <Skeleton className="h-[500px] w-full mb-4" />
    </div>
  );
};

export default ProfileSkeletonUI;
