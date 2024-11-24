// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import { generateJwtToken } from "@/lib/utils/jwt";
// import { sendEmail } from "@/lib/utils/sendEmail";
import prisma from "../../../../../../prisma/db";
// import { hashPassword } from "@/lib/src/bcrypt";

// const UserCreateSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string().email(),
//   password: z.string(),
//   phoneNo: z.string(),
// });

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     const body = await req.json();

//     const parsedBody = UserCreateSchema.parse(body);
//     const { email, firstName, lastName, password, phoneNo } = parsedBody;

//     const userFound = await prisma.users.findFirst({
//       where: { email: email },
//     });

//     if (userFound?.email) {
//       return NextResponse.json(
//         { error: "Email is already in use" },
//         { status: 401 }
//       );
//     }

//     const createUser = await prisma.users.create({
//       data: {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: await hashPassword(password),
//         phone: phoneNo,
//         roles: "USER",
//       },
//     });

//     const token = await generateJwtToken(createUser);

//     await sendEmail({
//       email: createUser.email,
//       subject: "Verify Your Email to Get Started with Waste Management System",
//       template: verificationEmailTemp(
//         createUser.firstName,
//         createUser.lastName,
//         token
//       ),
//     }).catch((err) => console.error("Email Send Error:", err));

//     return NextResponse.json(
//       { message: "User Created Successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Detailed Error:", error);
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }
//     return NextResponse.json(
//       { error: "An error occurred while processing your request" },
//       { status: 500 }
//     );
//   }
// }
