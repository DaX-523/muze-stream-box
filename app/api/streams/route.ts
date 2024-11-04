import { authOptions } from "@/app/lib/auth-options";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  console.log("api", session);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to create a stream" },
      { status: 401 }
    );
  }

  try {
    const stream = await prisma.stream.create({
      data: {
        userId: session?.user?.id,
        isActive: true,
        created: new Date(),
        extractedId: "",
      },
    });

    return NextResponse.json(
      { message: "Success", stream },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 411 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const token = await getToken({ req });
  // console.log("get api", session, token);
  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to create a stream" },
      { status: 401 }
    );
  }
  try {
    const streams = await prisma.stream.findMany({
      where: { userId: token?.userId ?? "" },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
        upvotes: { where: { userId: session?.user?.id ?? "" } },
      },
    });
    return NextResponse.json(
      {
        message: "Success",
        streams: streams.map(({ _count, ...rest }) => ({
          ...rest,
          upvotes: _count.upvotes,
          hasUpvoted: rest.upvotes.length ? true : false,
        })),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 411 }
    );
  }
}
