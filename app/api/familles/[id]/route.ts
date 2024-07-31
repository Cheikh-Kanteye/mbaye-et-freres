import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// Fonction GET pour récupérer une famille spécifique
export async function GET(request: NextRequest) {
  try {
    // Extraire l'ID de la famille depuis les paramètres de l'URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Récupérer l'ID depuis les paramètres de la requête

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID manquant ou invalide" },
        { status: 400 }
      );
    }

    // Trouver la famille avec l'ID spécifié
    const famille = await prisma.familles.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        categories: true,
        produits: true,
      },
    });

    if (!famille) {
      return NextResponse.json(
        { error: "Famille non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(famille);
  } catch (error) {
    console.error("Erreur lors de la récupération de la famille:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la famille" },
      { status: 500 }
    );
  }
}
