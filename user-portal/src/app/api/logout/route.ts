import { parse } from "cookie";
import prisma from "../../../../prisma/db"; // Adjust this path if needed
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const authToken = cookies.authToken;

    if (!authToken) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const deletedSessions = await prisma.sessions.deleteMany({
      where: { sessionToken: authToken },
    });

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
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

    response.headers.set("Location", new URL("/login", req.url).toString());

    return response;
  } catch (error: any) {
    console.error("Error during logout:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
