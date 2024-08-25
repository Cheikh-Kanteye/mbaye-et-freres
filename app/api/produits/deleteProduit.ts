import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    if (!produit) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'image du dossier local
    const imageFilePath = path.join(
      process.cwd(),
      "public",
      "produits",
      produit.public_id
    );
    if (fs.existsSync(imageFilePath)) {
      fs.unlinkSync(imageFilePath);
    }

    // Supprimer le produit de la base de données
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
