// import React from "react";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   MapIcon,
//   Trash,
//   Coins,
//   Medal,
// } from "lucide-react";

// const sidebarItems = [
//   { href: "/dashboard", label: "Dashboard", icon: Home },
//   { href: "/dashboard/report-waste", label: "Report Waste", icon: MapIcon },
//   { href: "/dashboard/collected-waste", label: "Collected Waste", icon: Trash },
//   { href: "/dashboard/rewards", label: "Rewards", icon: Coins },
//   { href: "/dashboard/leader-board", label: "Leader Board", icon: Medal },
// ];

// interface SidebarProps {
//   open: boolean;
// }

// const Sidebar = ({ open }: SidebarProps) => {
//   const pathName = usePathname();

//   return (
//     <aside
//       className={`bg-white border-r pt-[90px] border-gray-200 w-64 text-gray-800 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
//         open ? "translate-x-0" : "-translate-x-64"
//       } lg:translate-x-0`}
//     >
//       <ul>
//         {sidebarItems.map((item) => (
//           <li key={item.href} className="flex items-center p-4">
//             <item.icon className="w-5 h-5 mr-3" />
//             <a
//               href={item.href}
//               className={`${
//                 pathName === item.href
//                   ? "font-bold text-green-600"
//                   : "hover:border-b-2 border-transparent hover:border-green-600 transition-all duration-200 ease-in-out"
//               }`}
//             >
//               {item.label}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coins, Home, MapPin, Medal, Trash } from 'lucide-react'
import { cn } from "@/lib/utils"

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/report-waste", label: "Report Waste", icon: MapPin },
  { href: "/dashboard/collected-waste", label: "Collected Waste", icon: Trash },
  { href: "/dashboard/rewards", label: "Rewards", icon: Coins },
  { href: "/dashboard/leader-board", label: "Leader Board", icon: Medal },
]

interface SidebarProps {
  open: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "w-64 bg-white transition-all duration-300 ease-in-out",
        "fixed inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <nav className="space-y-1 px-2 pt-16 lg:pt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
              pathname === item.href
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-6 w-6 flex-shrink-0",
                pathname === item.href
                  ? "text-green-700"
                  : "text-gray-400 group-hover:text-gray-500"
              )}
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar


