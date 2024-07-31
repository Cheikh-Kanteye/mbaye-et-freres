import { familles } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getProduits(req: Request) {
  try {
    const produits = await prisma.produit.findMany({
      include: {
        familles: {
          include: {
            categories: true,
          },
        },
      },
    });

    if (produits.length === 0) {
      return NextResponse.json(
        { message: "Aucun produit trouvé" },
        { status: 200 }
      );
    }

    return NextResponse.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.error();
  }
}
