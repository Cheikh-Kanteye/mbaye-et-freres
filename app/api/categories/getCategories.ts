import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes GET
export async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        familles: true,
        produits: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({
      error: "Erreur lors de la récupération des categories",
    });
  }
}
