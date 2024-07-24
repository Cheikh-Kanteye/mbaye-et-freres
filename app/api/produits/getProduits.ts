import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fonction pour gérer les requêtes GET
export async function getProduits() {
  try {
    const produits = await prisma.produit.findMany({
      include: {
        categorie: true,
        images: true,
      },
    });
    return NextResponse.json(produits);
  } catch (error) {
    console.error("Error fetching produits:", error);
    return NextResponse.json({
      error: "Erreur lors de la récupération des produits",
    });
  }
}
