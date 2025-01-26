import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonWasteCollected = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
      <Skeleton className="h-56 w-[calc(33.333%-1rem)] mt-2" />
    </div>
  );
};

export default SkeletonWasteCollected;
