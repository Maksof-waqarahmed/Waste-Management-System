"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Crown, Medal, Trophy } from 'lucide-react'
import { LeaderBoardEntry } from "./leader-board-entry"
import { Pagination } from "@/components/ui/pagination"

const leaderboardData = [
  { id: 1, name: "Mends Albert", points: 54, level: 1, avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Sarah Johnson", points: 52, level: 1, avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "David Lee", points: 50, level: 1, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Emily Chen", points: 48, level: 1, avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Michael Brown", points: 46, level: 1, avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, name: "Sophia Martinez", points: 44, level: 1, avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 7, name: "Daniel Kim", points: 42, level: 1, avatar: "https://i.pravatar.cc/150?img=7" },
  { id: 8, name: "Olivia Taylor", points: 40, level: 1, avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 9, name: "Ethan Wilson", points: 38, level: 1, avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 10, name: "Ava Anderson", points: 36, level: 1, avatar: "https://i.pravatar.cc/150?img=10" },
]

const LeaderBoard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(leaderboardData.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return leaderboardData.slice(startIndex, endIndex)
  }

  return (
    <Card>
      <CardHeader className="bg-green-600">
        <CardTitle className="flex items-center justify-between text-white">
          <Trophy className="h-6 w-6" />
          <span>Top Performers</span>
          <Award className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 mb-4">
          <div>RANK</div>
          <div>USER</div>
          <div>POINTS</div>
          <div>LEVEL</div>
        </div>
        {getCurrentPageData().map((entry, index) => (
          <LeaderBoardEntry
            key={entry.id}
            rank={(currentPage - 1) * itemsPerPage + index + 1}
            {...entry}
          />
        ))}
        <Pagination
          className="mt-6"
        //   currentPage={currentPage}
        //   totalPages={totalPages}
        //   onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}

export default LeaderBoard

