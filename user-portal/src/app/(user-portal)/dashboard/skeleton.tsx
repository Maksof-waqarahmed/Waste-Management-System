import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

const SkeletonUI = () => {
  return (
    <div className="">
      <Skeleton className="h-12 w-[200px] mb-4" />
      <div className="">
        <Skeleton className="md:h-7 h-20 md:w-[600px]" />
        <div className="flex md:flex-row flex-col gap-4 mt-4">
          <Skeleton className="h-40 md:w-[500px] mt-2" />
          <Skeleton className="h-40 md:w-[500px] mt-2" />
          <Skeleton className="h-40 md:w-[500px] mt-2" />
          <Skeleton className="h-40 md:w-[500px] mt-2" />
        </div>
        <div className="hidden md:block md:flex gap-4 mt-4">
          <Skeleton className="h-72 w-[50%] mt-4" />
          <Skeleton className="h-72 w-[50%] mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonUI;
