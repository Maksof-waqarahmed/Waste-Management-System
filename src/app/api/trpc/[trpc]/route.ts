import { appRouter } from "@/lib/src/root"; // Use 'appRouter' (with lowercase 'a' if exported that way)
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
