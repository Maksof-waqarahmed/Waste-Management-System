"use client";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header  */}
        <Header/>
        <div className="flex flex-1">
          {/* sidebar  */}
          <Sidebar open={sidebarOpen}/>
          <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default layout;
