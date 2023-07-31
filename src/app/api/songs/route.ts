import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const images = await prisma.unsplashImages.findMany();
  const reversedImages = images.reverse();

  return NextResponse.json([...reversedImages]);
}
