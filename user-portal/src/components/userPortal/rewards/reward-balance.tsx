import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from 'lucide-react'
import Image from "next/image"
import logo from "../../../assets/images/logo.png"

interface RewardBalanceProps {
  balance: number
}

export const RewardBalance: React.FC<RewardBalanceProps> = ({ balance }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50 border-l-4 border-green-500">
        <CardTitle className="text-2xl text-green-700">Reward Balance</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Coins size={50} className="text-green-600" />
            <div>
              <h2 className="text-green-600 font-bold text-5xl">{balance}</h2>
              <p className="text-gray-500 font-semibold">Available Points</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <Image src={logo} alt="Logo" width={130} height={130} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

