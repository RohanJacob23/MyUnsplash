import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(request: Request) {
  const { url, label }: { url: string; label: string } = await request.json();
  const addImage = await prisma.unsplashImages.create({
    data: { url, label },
  });

  return NextResponse.json(addImage);
}
