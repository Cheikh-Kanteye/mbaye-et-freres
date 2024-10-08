import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes GET
export async function getFamilles() {
  try {
    const familles = await prisma.familles.findMany({
      include: {
        categories: true,
        produits: true,
        _count: true,
      },
    });
    return NextResponse.json(familles);
  } catch (error) {
    console.error("Error fetching familles:", error);
    return NextResponse.json({
      error: "Erreur lors de la récupération des categories",
    });
  }
}
