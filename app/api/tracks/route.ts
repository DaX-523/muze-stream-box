import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../lib/db";

const ParseBody = z.object({
  trackId: z.string(),
  streamId: z.string(),
  name: z.string(),
  duration: z.number(),
  uri: z.string(),
});

export const POST = async (req: NextRequest) => {
  const parsedBody = ParseBody.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    const stream = await prisma.stream.findUnique({
      where: { id: parsedBody.data.streamId },
    });
    if (!stream) return NextResponse.json({ message: "No stream found" });

    const track = await prisma.track.create({
      data: {
        id: parsedBody.data.trackId,
        name: parsedBody.data.name,
        duration: parsedBody.data.duration,
        streamId: parsedBody.data.streamId,
        uri: parsedBody.data.uri,
      },
    });

    return NextResponse.json({ message: "Track added to queue", track });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Some error occured" },
      { status: 411 }
    );
  }
};
