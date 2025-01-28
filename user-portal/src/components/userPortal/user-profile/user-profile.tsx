"use client";

import { useState } from "react";
import { UserProfileForm } from "./user-profile-form";
import { UserProfileHeader } from "./user-profile-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/lib/user-context";
import React from "react";

export default function UserProfile() {
  const { user } = useUser();
  // console.log(user);
  // const [user, setUser] = useState();

  const handleUpdateUser = (updatedUser: Partial<typeof user>) => {
    console.log(updatedUser);
  };
  if (!user) return <div>Loading</div>;
  return (
    <div className="space-y-6">
      <UserProfileHeader user={user} />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <UserProfileForm user={user} onUpdateUser={handleUpdateUser} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
