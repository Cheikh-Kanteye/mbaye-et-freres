import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getProduits(req: Request, id: string) {
  try {
    const produit = await prisma.produit.findUnique({
      where: { idProduit: parseInt(id) },
      include: { images: true },
    });

    if (!produit) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(produit);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return NextResponse.error();
  }
}
