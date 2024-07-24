import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

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
