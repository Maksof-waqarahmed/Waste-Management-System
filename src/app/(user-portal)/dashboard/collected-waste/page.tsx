import { Pagination } from "@/components/ui/pagination";
import CollectedWaste from "@/components/userPortal/collectedPage";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-green-700 text-center ">
        Waste Collection Tasks
      </h1>
      <CollectedWaste />
      <Pagination />
    </div>
  );
};

export default Page;
