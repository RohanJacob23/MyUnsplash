import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No id searchParam" });
  const images = await prisma.unsplashImages.delete({
    where: { id },
  });

  return NextResponse.json(images);
}
