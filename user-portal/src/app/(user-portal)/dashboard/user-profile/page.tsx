import UserProfile from "@/components/userPortal/user-profile/user-profile"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Profile | Waste Management System",
  description: "View and edit your user profile",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-green-600">
        User Profile
      </h1>
      <UserProfile />
    </div>
  )
}

