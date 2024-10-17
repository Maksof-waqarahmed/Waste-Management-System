// import { verifyJWT } from "./jwt";

// export function jwtMiddleware(handler: any) {
//   return async (req: Request, res: Response) => {
//     try {
//       const token = req.headers.authorization?.split(" ")[1];

//       if (!token) {
//         return new Response(JSON.stringify({ message: "Token not provided" }), {
//           status: 401,
//         });
//       }

//       const user = await verifyJWT(token);

//       if (!user) {
//         return new Response(
//           JSON.stringify({ message: "Invalid or expired token" }),
//           {
//             status: 403,
//           }
//         );
//       }
//       req.user = user;

//       return handler(req, res);
//     } catch (error) {
//       return new Response(JSON.stringify({ message: "Unauthorized access" }), {
//         status: 401,
//       });
//     }
//   };
// }
