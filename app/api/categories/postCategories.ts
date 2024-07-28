import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function postCategorie(req: Request) {
  try {
    const { nom } = await req.json();
    const categorie = await prisma.categorie.create({
      data: {
        nom,
      },
    });

    return NextResponse.json(categorie);
  } catch (error) {
    console.error("Error creating categorie:", error);
    return NextResponse.error();
  }
}
