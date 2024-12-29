"use client"

import { useState } from "react"
import { UserProfileForm } from "./user-profile-form"
import { UserProfileHeader } from "./user-profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { UserStats } from "./user-stats"

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "I'm a software developer passionate about creating user-friendly applications.",
    profileImage: "/placeholder.svg?height=128&width=128",
  })

  const handleUpdateUser = (updatedUser: Partial<typeof user>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUser }))
  }

  return (
    <div className="space-y-6">
      <UserProfileHeader user={user} />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <UserProfileForm user={user} onUpdateUser={handleUpdateUser} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardContent className="pt-6">
              <UserStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

