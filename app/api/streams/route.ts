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
  const streamId = req.nextUrl.searchParams.get("streamId");

  const session = await getServerSession(authOptions);
  const token = await getToken({ req });
  // console.log("get api", session, token);
  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to create a stream" },
      { status: 401 }
    );
  }

  try {
    const [stream, streams] = await Promise.all([
      await prisma.stream.findUnique({
        where: { id: streamId ?? "" },
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
          upvotes: { where: { userId: session?.user?.id ?? "" } },
        },
      }),
      await prisma.stream.findMany({
        where: { userId: token?.userId ?? "" },
        include: {
          _count: {
            select: {
              upvotes: true,
            },
          },
        },
      }),
    ]);
    return NextResponse.json(
      {
        message: "Success",
        stream,
        hasUpvoted: stream?.upvotes.length ? true : false,

        streams: streams.map(({ _count, ...rest }) => ({
          ...rest,
          upvotes: _count.upvotes,
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
