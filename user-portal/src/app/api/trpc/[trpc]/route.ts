import { appRouter, createTRPCContext } from "@/app/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";


function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const handler = (async (req: Request) => {

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () =>
      createTRPCContext({
        // session: req.auth,
        headers: req.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error.message);

      // if (error.code === 'UNAUTHORIZED') {
      //   let from = req.nextUrl.pathname;

      //   if (req.nextUrl.search) {
      //     from += req.nextUrl.search;
      //   }

      //   const encodedCallbackUrl = encodeURIComponent(from);
      //   return new URL(`/auth/login?from=${encodedCallbackUrl}`, req.nextUrl)
      //   // return Response.redirect(
      //   //   new URL(`/auth/login?from=${encodedCallbackUrl}`, req.nextUrl),
      //   // );
      // }
    },
  });
  setCorsHeaders(response);
  return response;


});

export { handler as GET, handler as POST };