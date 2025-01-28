import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    profileImg: string | null;
    number: number;
  };
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-6 rounded-lg shadow">
      <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
        <AvatarImage
          src={user.profileImg || ""}
          alt={user.firstName + " " + user.lastName}
        />
        <AvatarFallback>
          {user.firstName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold">
          {user.firstName + " " + user.lastName}
        </h2>
        <p className="text-gray-500">{user.number}</p>
      </div>
    </div>
  );
}
