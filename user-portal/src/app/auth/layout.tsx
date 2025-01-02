import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-100">
        {children}
      </div>
    </div>
  );
};

export default Layout;
