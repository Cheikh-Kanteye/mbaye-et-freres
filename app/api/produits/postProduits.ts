import { NextRequest, NextResponse } from "next/server";
// pages/api/produits/postProduits.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Produit } from "@prisma/client";

type Payload = {
  produit: {
    nom: string;
    description: string;
    prix: number;
    specifications: string;
    categorieId: number;
  };
};

// Fonction pour gérer les requêtes POST
export async function postProduits(req: Request) {
  try {
    const {
      nom,
      description: string,
      prix,
      specifications,
      categorieId,
    } = await req.json();
    const produit = await prisma.produit.create({
      data: {
        nom,
        description: string,
        prix,
        specifications,
        categorieId,
      },
    });

    console.log("produit:", produit);

    return NextResponse.json(produit);
  } catch (error) {
    console.error("Error creating produit:", error);
    return NextResponse.error();
  }
}
