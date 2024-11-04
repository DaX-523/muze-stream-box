import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ParseBody = z.object({
  streamId: z.object({
    id: z.string(),
  }),
});

export const POST = async (req: NextRequest) => {
  const data = ParseBody.parse(await req.json());
  const user = await getServerSession();

  const userData = await prisma.user.findFirst({
    where: { email: user?.user?.email ?? "" },
  });
  if (!userData)
    return NextResponse.json({ message: "Unauthorized." }, { status: 403 });

  try {
    await prisma.upvote.create({
      data: {
        streamId: data?.streamId?.id,
        userId: userData?.id,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to upvote" }, { status: 411 });
  }
};
