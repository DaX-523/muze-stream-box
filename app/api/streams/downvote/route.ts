import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ParseBody = z.object({
  streamId: z.string(),
});

export const POST = async (req: NextRequest) => {
  const data = ParseBody.parse(await req.json());
  const user = await getServerSession();

  const userData = await prisma.user.findFirst({
    where: { email: user?.user?.email ?? "" },
  });
  if (!userData)
    return NextResponse.json({ message: "Unauthorized." }, { status: 403 });

  await prisma.upvote.delete({
    where: {
      userId_streamId: {
        streamId: data?.streamId,
        userId: userData?.id,
      },
    },
  });

  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to downvote" },
      { status: 411 }
    );
  }
};
