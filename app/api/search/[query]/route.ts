import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Fonction pour supprimer les accents, cédilles et caractères spéciaux
const removeSpecialCharacters = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Retire les accents
    .replace(/ç/g, "c") // Remplace cédille par c
    .replace(/[^a-zA-Z0-9\s]/g, ""); // Retire les caractères spéciaux
};

export async function GET(
  req: NextRequest,
  { params }: { params: { query: string } }
) {
  try {
    const query = params.query;

    if (!query) {
      return NextResponse.json(
        { message: "Le paramètre 'query' est requis." },
        { status: 400 }
      );
    }

    // Normalisation et nettoyage de la chaîne de recherche
    const searchTerm = removeSpecialCharacters(
      String(query).trim().toLowerCase()
    );

    // Vérifie que la chaîne de recherche n'est pas vide après nettoyage
    if (!searchTerm) {
      return NextResponse.json(
        { message: "Le terme de recherche est invalide." },
        { status: 400 }
      );
    }

    // Recherche des produits avec leurs familles et catégories
    const produits = await prisma.produit.findMany({
      include: {
        familles: {
          include: {
            categories: true,
          },
        },
      },
    });

    const searchResult = produits.filter((p) => {
      const familleNom = removeSpecialCharacters(p.familles.nom.toLowerCase());
      const categorieNom = removeSpecialCharacters(
        p.familles.categories.nom.toLowerCase()
      );

      return (
        categorieNom.includes(searchTerm) || familleNom.includes(searchTerm)
      );
    });

    // Vérifie si des produits ont été trouvés
    if (searchResult.length === 0) {
      return NextResponse.json(
        { message: "Aucun produit trouvé." },
        { status: 404 }
      );
    }

    return NextResponse.json(searchResult, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la recherche des produits:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
