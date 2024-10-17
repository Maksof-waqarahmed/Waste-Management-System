import React from "react";
import {
  Menu,
  Leaf,
  Search,
  Coins,
  Bell,
  BellDot,
  ChevronDown,
  LogOut,
  User,
  icons,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "../assets/Images/logo.png";
import Link from "next/link";
import { UseMediaQuery } from "./hooks/useMediaQuery";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Span } from "next/dist/trace";

interface HeaderProp {
  onMenuClick: () => void;
  totalEarnings: number;
}
const Header = () => {
  const notification: any = [];
  const balance = 23.323;
  function handleNotificationClick(item: any) {}
  const isMobile = UseMediaQuery("(max-width: 768px)");
  return (
    <header className="w-full bg-white flex border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2 w-full">
        <div className="flex items-center justify-between px-4">
          <Button variant="ghost" size={"icon"}>
            <Menu color="#15803D" className="h-8 w-8" />
          </Button>
          <Link href="/dashboard" className="flex items-center ml-3">
            <Image src={logo} alt="" width={60} />
            {!isMobile ? (
            <span className="font-bold text-[23px] text-[#15803D]">
              Waste Management System
            </span>
            ) : <span className="text-2xl font-semibold	 text-[#15803D]" >WMS</span> }
          </Link>
        </div>
        {!isMobile && (
          <div className="flex-1 max-w-xl mx-4">
            <div className="flex items-center">
              <Input placeholder="search..." type="text" />
              <Button className="flex items-center ml-2">
                <Search color="white" />
              </Button>
            </div>
          </div>
        )}
        <div className="flex items-center">
          {isMobile && (
            <Button variant={"ghost"} size={"icon"}>
              <Search color="#15803D" />
            </Button>
          )}
          <div className="flex items-center flex-col-reverse md:flex-row">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="mr-2 relative "
                >
                  <Bell className="w-5 h-5" color="#15803D" />
                  {notification.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5">
                      <span> {notification.length} </span>
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notification.length > 0 ? (
                  notification.map((item: any) => {
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => handleNotificationClick(item.id)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{item.type}</span>
                          <span className="font-sm text-[#15803D]">
                            {item.message}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    );
                  })
                ) : (
                  <DropdownMenuItem>No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div>
              <Badge className="flex items-center" variant={"notification"}>
                <Coins className="md:w-5 md:h-5 h-4 w-4 mr-1 text-[#15803D]" />
                <span className="font-semibold text-sm md:text-base text-gray-800">
                  {balance.toFixed(2)}
                </span>
              </Badge>
            </div>
          </div>
          <div className="ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                    />
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  Waqar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem  className="font-medium">
                  <Link href={"/auth/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem  className="font-medium">
                  <Link href={"/auth/setting"}>Setting</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium">
                <Link href={"/auth/login"}>Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
