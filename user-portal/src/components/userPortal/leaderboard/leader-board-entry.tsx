import React from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Crown, Medal } from 'lucide-react'

interface LeaderBoardEntryProps {
  rank: number
  name: string
  points: number
  level: number
  avatar: string
}

export const LeaderBoardEntry: React.FC<LeaderBoardEntryProps> = ({
  rank,
  name,
  points,
  level,
  avatar,
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="font-semibold text-gray-600">{rank}</span>
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 items-center py-4 border-t border-gray-200">
      <div className="flex items-center justify-center">
        {getRankIcon(rank)}
      </div>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{name}</span>
      </div>
      <div className="flex items-center">
        <Award className="h-5 w-5 text-purple-500 mr-2" />
        <span className="font-medium">{points}</span>
      </div>
      <div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-600">
          Level {level}
        </Badge>
      </div>
    </div>
  )
}

