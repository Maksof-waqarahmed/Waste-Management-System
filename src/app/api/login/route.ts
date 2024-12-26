import { NextResponse } from "next/server";
import db from "../../../../prisma/db";
import { z } from "zod";
import { verifyPassword } from "@/lib/services/bcrypt";
import { generateJwtToken } from "@/lib/services/jwt";
import { serialize } from "cookie";

interface Session {
  id: string;
  email: string;
  number: number;
  firstName: string;
  Name: string;
  proImage: string;
  isVerified: boolean;
}

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  LoginUserSchema.parse(body);
  try {
    const user = await db.users.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const isTruePassword = await verifyPassword(body.password, user.password);
    if (!isTruePassword) {
      return NextResponse.json(
        {
          message: "Invalid password. Please try again or reset your password.",
        },
        { status: 404 }
      );
    }
    const payload = {
      id: user.id,
      email: user.email,
      number: user.phone,
      name: `${user.firstName} ${user.lastName}`,
      proImage: user.profileImg,
      role: "USER",
      isVerified: user.isVerified,
    };
    const token = await generateJwtToken(payload);
    await db.sessions.create({
      data: {
        sessionToken: token,
        userId: user.id,
      },
    });

    const cookies = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    const response = NextResponse.json(
      { message: "Successful Login" },
      { status: 200 }
    );
    response.headers.append("Set-Cookie", cookies);
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
