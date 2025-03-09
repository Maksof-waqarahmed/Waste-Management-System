"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Coins, LogOut, Menu, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import logo from "../assets/images/logo.png";
import { UseMediaQuery } from "./hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import { api } from "@/trpc-server/react";

interface HeaderProps {
  onMenuClick: () => void;
  totalEarnings: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, totalEarnings }) => {
  const { data } = api.notification.getAllNotification.useQuery();
  const { mutateAsync: markAsRead } =
    api.notification.markAllNotificationsAsRead.useMutation();
  const isMobile = UseMediaQuery("(max-width: 768px)");
  const notifications = data?.data || [];
  const router = useRouter();
  const handleNotificationClick = () => {
    markAsRead();
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6 text-green-700" />
          </Button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={40} height={40} />
            {!isMobile && (
              <span className="text-xl font-bold text-green-700">
                Waste Management System
              </span>
            )}
            {isMobile && (
              <span className="text-xl font-semibold text-green-700">WMS</span>
            )}
          </Link>
        </div>

        {!isMobile && (
          <div className="flex-1 max-w-md px-4">
            <div className="flex items-center">
              <Input placeholder="Search..." className="mr-2" />
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell
                  className="h-5 w-5 text-green-700"
                  onClick={() => handleNotificationClick}
                />
                {notifications?.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0"
                  >
                    {notifications?.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notifications?.length > 0 ? (
                <>
                  <DropdownMenuItem
                    onClick={handleNotificationClick}
                    className="text-green-700 font-medium cursor-pointer"
                  >
                    ✅ Mark All as Read
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {notifications.map((item) => (
                    <DropdownMenuItem key={item.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-sm text-green-600">
                          {item.message}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </>
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge
            variant="outline"
            className="flex items-center space-x-1 px-3 py-1"
          >
            <Coins className="h-4 w-4 text-green-700" />
            <span className="text-sm font-semibold">
              {totalEarnings.toFixed(2)}
            </span>
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="font-medium">Waqar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/dashboard/user-profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/auth/setting">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
