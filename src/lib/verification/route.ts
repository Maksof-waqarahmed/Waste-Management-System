import { verifyJWT } from "@/lib/utils/jwt";
import db from "../../../prisma/db";
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const verify: any = await verifyJWT(body.token);

    if (!verify?.id) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 400,
      });
    }

    const verified = await db.users.update({
      where: { id: verify.id },
      data: {
        isVerified: true,
      },
    });
    return new Response(JSON.stringify({ message: "Verified", verified }), {
      status: 200,
    });
  } catch (error) {
    console.log("Error:", error);
    return new Response(JSON.stringify({ message: "Error" }), { status: 400 });
  }
}
