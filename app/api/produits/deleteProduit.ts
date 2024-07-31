import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function deleteProduit(req: Request) {
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

    const produit = await prisma.produit.findUnique({
      where: { id: idNumber },
    });

    //supprimer l'image sur cloudinary
    if (produit) await cloudinary.uploader.destroy(produit.public_id);

    // Supprimer le produit
    await prisma.produit.delete({
      where: { id: idNumber },
    });

    return NextResponse.json({ message: "Produit supprimé" }, { status: 200 });
  } catch (error: any) {
    console.error("Error during product deletion:", error.message);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}
