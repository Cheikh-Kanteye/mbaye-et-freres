import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function postCategorie(req: Request) {
  try {
    const { nom, description } = await req.json();
    const categorie = await prisma.categories.create({
      data: {
        nom,
        description,
      },
    });

    return NextResponse.json(categorie);
  } catch (error) {
    console.error("Error creating categorie:", error);
    return NextResponse.error();
  }
}
