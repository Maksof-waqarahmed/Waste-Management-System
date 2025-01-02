"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const rewards = [
  { id: 1, name: 'Eco-friendly Water Bottle', points: 50, available: true },
  { id: 2, name: 'Reusable Shopping Bag', points: 30, available: true },
  { id: 3, name: 'Plant a Tree Certificate', points: 100, available: false },
]

export const AvailableRewards = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Rewards</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards.length > 0 ? (
          rewards.map((reward) => (
            <Card key={reward.id} className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold">{reward.name}</p>
                  <p className="text-sm text-gray-500">{reward.points} points</p>
                </div>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={reward.available ? "default" : "secondary"}
                      disabled={!reward.available}
                    >
                      {reward.available ? "Redeem" : "Out of Stock"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{reward.available ? "Click to redeem this reward" : "This reward is currently unavailable"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Card>
          ))
        ) : (
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-center space-x-3">
              <Info className="text-yellow-500 w-6 h-6" />
              <p className="font-semibold text-yellow-700">
                No rewards available at the moment
              </p>
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

