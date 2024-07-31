"use server";

import prisma from "@/lib/prisma";

export const fetchProduits = async (nomFamille: string) => {
  try {
    // Trouver la famille correspondant au nom donné
    const famille = await prisma.familles.findFirst({
      where: {
        nom: {
          equals: nomFamille,
          mode: "insensitive",
        },
      },
    });

    if (!famille) {
      throw new Error("Famille non trouvée");
    }

    // Trouver les produits associés à cette famille
    const produits = await prisma.produit.findMany({
      where: {
        idFamille: famille.id,
      },
      include: {
        familles: {
          include: {
            categories: true,
          },
        },
      },
    });

    return produits;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
};
