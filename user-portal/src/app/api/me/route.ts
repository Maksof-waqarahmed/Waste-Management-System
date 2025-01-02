import { NextResponse } from "next/server";
import prisma from "../../../../prisma/db";
import { verifyJWT } from "@/lib/services/jwt";

export async function GET(req: Request) {
  const authToken = req.headers.get("authToken");

  if (!authToken) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const user: any = await verifyJWT(authToken);

    const userData = await prisma.users.findFirst({
      where: { id: user.id },
      include: {
        reward: true,
        collectedWaste: true,
        leaderboard: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { password, emailToken, ...publicData } = userData;
    return NextResponse.json(publicData);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
