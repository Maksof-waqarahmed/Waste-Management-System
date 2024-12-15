"use client";

// import type { AppRouter } from "@wall/api";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TRPCClientError, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/app/trpc";
import { toast } from "sonner";

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headersPromise: Promise<Headers>;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: (failureCount, error) => {
              if (handleErrorOnClient(error)) return false;
              return failureCount < 3;
            },
          },
          mutations: {
            retry: (_, error) => {
              handleErrorOnClient(error);
              console.log(error)
              return false;
            },
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        // loggerLink({
        //   enabled: (op) =>
        //     process.env.NODE_ENV === "development" ||
        //     (op.direction === "down" && op.result instanceof Error),
        // }),
        unstable_httpBatchStreamLink({
          url: getBaseUrl() + "/api/trpc",
          async headers() {
            const headers = new Headers(await props.headersPromise);
            headers.set("x-trpc-source", "nextjs-react");
            headers.set("portal", "User");
            return headers;
          },
        }),
      ],
    })
  );
// console.log(first)
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

function handleErrorOnClient(error: unknown): boolean {
  const pathname = window.location.pathname;
  if (!(error instanceof TRPCClientError)) return false;
  // TODO: handle authentication errors
  if (error.data?.code === "UNAUTHORIZED") {
    return true;
  }

  toast.error(error.message.slice(0, 50) + "...");
  return true;
}
