import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { TRPCReactProvider } from "@/trpc-server/react";
import { headers } from "next/headers";
import { cache } from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/lib/user-context";

export const metadata: Metadata = {
  title: "Waste Managemnet System",
  description: "Build by Waqar Ahmed",
};
const getHeaders = cache(async () => headers());
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCReactProvider headersPromise={getHeaders()}>
          <Toaster position="top-right" reverseOrder={false} />
          <UserProvider>{children}</UserProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
