// "use client";
// import Header from "@/components/header";
// import Sidebar from "@/components/sidebar";
// import React, { useState } from "react";

// const layout = ({ children }: { children: React.ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
//   return (
//     <div>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         {/* Header  */}
//         <Header/>
//         <div className="flex flex-1">
//           {/* sidebar  */}
//           <Sidebar open={sidebarOpen}/>
//           <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default layout;
"use client"

import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import React, { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header onMenuClick={toggleSidebar} totalEarnings={23.323} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

