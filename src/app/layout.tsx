import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { TRPCReactProvider } from "@/trpc-server/react";
import { headers } from "next/headers";
import { cache } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
