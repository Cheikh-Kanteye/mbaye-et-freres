import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes POST
export async function postCategorie(req: Request) {
  try {
    const { nom } = await req.json();
    const categorie = await prisma.categorie.create({
      data: {
        nom,
      },
    });

    console.log("categorie:", categorie);

    return NextResponse.json(categorie);
  } catch (error) {
    console.error("Error creating categorie:", error);
    return NextResponse.error();
  }
}
