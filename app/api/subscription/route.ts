import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    });
    return NextResponse.json(subscription, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json("Error while fetching subscription data", {
      status: 500,
    });
  }
}
