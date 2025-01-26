"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/trpc-server/react";

interface UserContextValue {
  user: any;
  loading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = api.userAuth.getCurrentUser.useQuery();

  return (
    <UserContext.Provider value={{ user: data, loading: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
