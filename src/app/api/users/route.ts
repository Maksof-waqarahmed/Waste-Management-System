// import { NextResponse } from "next/server";
// import { z } from "zod";
// import bcrypt from "bcrypt";
// import prisma from "../../../lib/db/db";
// import { generateJwtToken, verifyJWT } from "@/utils/jwt";
// import { sendVerificationEmail } from "@/utils/sendEmail";

// const UserCreateSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string().email(),
//   password: z.string(),
//   phoneNo: z.string(),
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const parsedBody = UserCreateSchema.parse(body);

//     const { email, firstName, lastName, password, phoneNo } = parsedBody;

//     const userFound = await prisma.users.findUnique({
//       where: { email: email },
//     });

//     if (userFound) {
//       return new Response(JSON.stringify({ message: "User already exists" }), {
//         status: 400,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.users.create({
//       data: {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: hashedPassword,
//         phone: phoneNo,
//         roles: "USER",
//       },
//     });

//     const token = await generateJwtToken(newUser);
//     await verifyJWT(token);
//     sendVerificationEmail(token, newUser);

//     newUser.password = "";
//     return new Response(
//       JSON.stringify({ message: "User Created Successfully", newUser }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return new Response(JSON.stringify({ message: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }
