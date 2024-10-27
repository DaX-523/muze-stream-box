import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ParseBodies = z.object({
  creatorId: z.string(),
});

export async function POST(req: NextRequest) {
  const data = ParseBodies.parse(await req.json());

  try {
    await prisma.stream.create({
      data: {
        userId: data.creatorId,
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
