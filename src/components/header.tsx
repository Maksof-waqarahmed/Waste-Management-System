// "use client";
// import React, { useState } from "react";
// import {
//   Menu,
//   Leaf,
//   Search,
//   Coins,
//   Bell,
//   BellDot,
//   ChevronDown,
//   LogOut,
//   User,
//   icons,
// } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "./ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import logo from "../assets/Images/logo.png";
// import Link from "next/link";
// import { UseMediaQuery } from "./hooks/useMediaQuery";
// import { Avatar, AvatarImage } from "./ui/avatar";

// interface HeaderProp {
//   onMenuClick: () => void;
//   totalEarnings: number;
// }
// const Header = () => {
//   const notification: any = [];
//   const balance = 23.323;
//   function handleNotificationClick(item: any) {}
//   const isMobile = UseMediaQuery("(max-width: 768px)");
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     console.log("click", sidebarOpen)
//   };
//   const handleLogout = async () => {
//     await fetch("/api/logout", {
//       method: "POST",
//     });
//   };
//   return (
//     <header className="w-full bg-white flex border-b border-gray-200 sticky top-0 z-50">
//       <div className="flex items-center justify-between px-4 py-2 w-full">
//         <div className="flex items-center justify-between px-4">
//           <Button variant="ghost" size={"icon"} onClick={toggleSidebar}>
//             <Menu color="#15803D" className="h-8 w-8" />
//           </Button>
//           <Link href="/dashboard" className="flex items-center ml-3">
//             <Image src={logo} alt="" width={60} />
//             {!isMobile ? (
//               <span className="font-bold text-[23px] text-[#15803D]">
//                 Waste Management System
//               </span>
//             ) : (
//               <span className="text-2xl font-semibold	 text-[#15803D]">WMS</span>
//             )}
//           </Link>
//         </div>
//         {!isMobile && (
//           <div className="flex-1 max-w-xl mx-4">
//             <div className="flex items-center">
//               <Input placeholder="search..." type="text" />
//               <Button className="flex items-center ml-2">
//                 <Search color="white" />
//               </Button>
//             </div>
//           </div>
//         )}
//         <div className="flex items-center">
//           {isMobile && (
//             <Button variant={"ghost"} size={"icon"}>
//               <Search color="#15803D" />
//             </Button>
//           )}
//           <div className="flex items-center flex-col-reverse md:flex-row">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant={"ghost"}
//                   size={"icon"}
//                   className="mr-2 relative "
//                 >
//                   <Bell className="w-5 h-5" color="#15803D" />
//                   {notification.length > 0 && (
//                     <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5">
//                       <span> {notification.length} </span>
//                     </Badge>
//                   )}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {notification.length > 0 ? (
//                   notification.map((item: any) => {
//                     return (
//                       <DropdownMenuItem
//                         key={item.id}
//                         onClick={() => handleNotificationClick(item.id)}
//                       >
//                         <div className="flex flex-col">
//                           <span className="font-medium">{item.type}</span>
//                           <span className="font-sm text-[#15803D]">
//                             {item.message}
//                           </span>
//                         </div>
//                       </DropdownMenuItem>
//                     );
//                   })
//                 ) : (
//                   <DropdownMenuItem>No new notifications</DropdownMenuItem>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <div>
//               <Badge className="flex items-center" variant={"notification"}>
//                 <Coins className="md:w-5 md:h-5 h-4 w-4 mr-1 text-[#15803D]" />
//                 <span className="font-semibold text-sm md:text-base text-gray-800">
//                   {balance.toFixed(2)}
//                 </span>
//               </Badge>
//             </div>
//           </div>
//           <div className="ml-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <div className="flex items-center cursor-pointer">
//                   <Avatar>
//                     <AvatarImage src="https://github.com/shadcn.png" />
//                   </Avatar>
//                 </div>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem className="font-medium">
//                   Waqar
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="font-medium">
//                   <Link href={"/user-profile"}>Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="font-medium">
//                   <Link href={"/auth/setting"}>Setting</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="font-medium">
//                   <Link
//                     href="/auth/login"
//                     onClick={() => {
//                       handleLogout();
//                     }}
//                     className="w-full text-left"
//                   >
//                     Sign out
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Coins, LogOut, Menu, Search, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import logo from "@/assets/images/logo.png"
import { UseMediaQuery } from "./hooks/useMediaQuery"

interface HeaderProps {
  onMenuClick: () => void
  totalEarnings: number
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, totalEarnings }) => {
  const isMobile = UseMediaQuery("(max-width: 768px)")
  const notifications: any[] = [] // Replace with actual notifications data

  const handleNotificationClick = (id: string) => {
    // Handle notification click
  }

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
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
                <Bell className="h-5 w-5 text-green-700" />
                {notifications.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full p-0"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => handleNotificationClick(item.id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-sm text-green-600">{item.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant="outline" className="flex items-center space-x-1 px-3 py-1">
            <Coins className="h-4 w-4 text-green-700" />
            <span className="text-sm font-semibold">{totalEarnings.toFixed(2)}</span>
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="font-medium">Waqar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/user-profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/auth/setting">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <Link href="/auth/login">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

