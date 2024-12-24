import { parse } from "cookie";
import prisma from "../../../../prisma/db";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.authToken;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    await prisma.sessions.deleteMany({
      where: { sessionToken: token },
    });

    const response = NextResponse.json({ message: "Logged out successfully" });
    response.headers.set(
      "Set-Cookie",
      serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      })
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
