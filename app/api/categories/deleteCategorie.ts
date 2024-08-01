import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function deleteCategorie(req: Request) {
  try {
    if (req.method !== "DELETE") {
      return NextResponse.json(
        { error: "Méthode non autorisée" },
        { status: 405 }
      );
    }

    const { id } = await req.json();
    console.log("Received data:", { id });

    if (!id) {
      return NextResponse.json({ error: "ID est requise" }, { status: 400 });
    }

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    // Récupérer les produits associés à la catégorie
    const produits = await prisma.produit.findMany({
      where: { familles: { idCategorie: idNumber } },
      select: { public_id: true },
    });

    // Supprimer les images des produits sur Cloudinary
    await Promise.all(
      produits.map(async (produit) => {
        try {
          await cloudinary.uploader.destroy(produit.public_id);
        } catch (error: any) {
          console.error(
            `Failed to delete image with public_id ${produit.public_id}:`,
            error.message
          );
        }
      })
    );

    // Supprimer les produits associés aux familles de la catégorie
    await prisma.produit.deleteMany({
      where: {
        familles: {
          idCategorie: idNumber,
        },
      },
    });

    // Supprimer les familles associées à la catégorie
    await prisma.familles.deleteMany({
      where: {
        idCategorie: idNumber,
      },
    });

    // Supprimer la catégorie
    await prisma.categories.delete({
      where: { id: idNumber },
    });

    return NextResponse.json(
      { message: "Catégorie et images supprimées avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during category deletion:", error.message);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la catégorie" },
      { status: 500 }
    );
  }
}
