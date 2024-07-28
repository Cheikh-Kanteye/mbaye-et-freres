import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function postFamille(req: Request) {
  try {
    const { nom, idCategorie, description, guideUrl } = await req.json();
    const famille = await prisma.familles.create({
      data: {
        nom,
        idCategorie,
        description,
        guideUrl,
      },
    });

    return NextResponse.json(famille);
  } catch (error) {
    console.error("Error creating famille:", error);
    return NextResponse.error();
  }
}
