"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoveDownRight, MoveUpRight } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

const transactions = [
  { id: 1, type: 'redeem', amount: -10, description: 'Redeemed all points', date: '2024-09-05' },
  { id: 2, type: 'earn', amount: 10, description: 'Points earned reporting waste', date: '2024-09-05' },
  { id: 3, type: 'earn', amount: 15, description: 'Bonus points for recycling', date: '2024-09-04' },
  { id: 4, type: 'redeem', amount: -5, description: 'Redeemed for eco-friendly product', date: '2024-09-03' },
]

export const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
          <React.Fragment key={transaction.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {transaction.type === 'earn' ? (
                  <MoveUpRight className="w-5 h-5 text-green-600" />
                ) : (
                  <MoveDownRight className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-sm font-semibold truncate max-w-[200px]">
                          {transaction.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{transaction.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${
                transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'earn' ? '+' : '-'}{Math.abs(transaction.amount)}
              </p>
            </div>
            {index < transactions.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

