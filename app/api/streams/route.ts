import { authOptions } from "@/app/lib/auth-options";
import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);
  console.log("api", session);
  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "You must be logged in to create a stream" },
      { status: 401 }
    );
  }

  try {
    await prisma.stream.create({
      data: {
        userId: session?.user?.id,
        isActive: true,
        created: new Date(),
        extractedId: "",
      },
    });

    return NextResponse.json(
      { message: "Success" },
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
  const userId = req.nextUrl.searchParams.get("foo");

  try {
    const streams = await prisma.stream.findMany({
      where: { userId: userId ?? "" },
    });
    return NextResponse.json(
      { message: "Success", streams },
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
