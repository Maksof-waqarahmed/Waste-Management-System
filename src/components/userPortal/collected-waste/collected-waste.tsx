"use client"

import React, { useState } from "react"
import { Search, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CollectionCard } from "./collection-card"
import { Pagination } from "./pagination"

const mockData = [
  {
    id: 1,
    location: "Orangi Town 10 Number",
    wasteType: "Mixed Waste",
    amount: "Approximately 100kg",
    date: "2024-03-11",
    verified: true,
    rewardEarned: true,
  },
  {
    id: 2,
    location: "Lyari",
    wasteType: "Plastic",
    amount: "Approximately 50kg",
    date: "2024-03-10",
    verified: true,
    rewardEarned: true,
  },
  {
    id: 3,
    location: "Saddar",
    wasteType: "Paper",
    amount: "Approximately 75kg",
    date: "2024-03-09",
    verified: false,
    rewardEarned: false,
  },
  {
    id: 4,
    location: "Clifton",
    wasteType: "Metal",
    amount: "Approximately 120kg",
    date: "2024-03-08",
    verified: true,
    rewardEarned: true,
  },
  // Add more mock data as needed
]

const CollectedWaste = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || item.wasteType.toLowerCase() === filterType
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
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
        {currentData.map((item) => (
          <CollectionCard key={item.id} {...item} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default CollectedWaste

