"use server";

import prisma from "@/lib/prisma";

export const fetchProduits = async (
  id: string,
  type: "famille" | "categorie"
) => {
  try {
    let produits;

    // Assurez-vous que le nom est normalisé (par exemple avec NFD)
    if (type === "famille") {
      // Trouver la famille correspondant au nom donné
      const famille = await prisma.familles.findFirst({
        where: {
          // Comparer sans accent
          id: {
            equals: Number(id),
          },
        },
      });

      if (!famille) {
        throw new Error("Famille non trouvée");
      }

      // Trouver les produits associés à cette famille
      produits = await prisma.produit.findMany({
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
    } else if (type === "categorie") {
      // Trouver la catégorie correspondant au nom donné
      const categorie = await prisma.categories.findFirst({
        where: {
          nom: {
            equals: id,
            mode: "insensitive",
          },
        },
      });

      if (!categorie) {
        throw new Error("Catégorie non trouvée");
      }

      // Trouver les produits associés à cette catégorie
      produits = await prisma.produit.findMany({
        where: {
          idCategorie: categorie.id,
        },
        include: {
          familles: {
            include: {
              categories: true,
            },
          },
        },
      });
    } else {
      throw new Error("Type de recherche non valide");
    }

    return produits;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
};
