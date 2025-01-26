"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CollectionCard } from "./collection-card";
import { Pagination } from "./pagination";
import { api } from "@/trpc-server/react";
import SkeletonWasteCollected from "@/app/(user-portal)/dashboard/collected-waste/skeleton";

const CollectedWaste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const skip = (currentPage - 1) * itemsPerPage;
  const { data } = api.wasteSubmit.getAllReports.useQuery({
    take: itemsPerPage,
    skip,
  });

  if (!data) return <SkeletonWasteCollected />;

  const allReports = data?.data || [];

  const filteredData = allReports.filter((item) => {
    const matchesSearch = item.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || item.wasteType.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(allReports.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Input
            className="flex-1"
            placeholder="Search by area"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="mixed waste">Mixed Waste</SelectItem>
            <SelectItem value="plastic">Plastic</SelectItem>
            <SelectItem value="paper">Paper</SelectItem>
            <SelectItem value="metal">Metal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item, index: number) => (
          <CollectionCard key={index} {...item} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CollectedWaste;
