import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes POST
export async function postCategorie(req: Request) {
  try {
    const { nomCategorie } = await req.json();
    const categorie = await prisma.categorie.create({
      data: {
        nomCategorie,
      },
    });

    console.log("categorie:", categorie);

    return NextResponse.json(categorie);
  } catch (error) {
    console.error("Error creating categorie:", error);
    return NextResponse.error();
  }
}
