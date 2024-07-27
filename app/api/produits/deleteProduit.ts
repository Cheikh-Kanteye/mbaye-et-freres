import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function deleteProduit(req: Request, id: string) {
  try {
    await prisma.produit.delete({
      where: { idProduit: parseInt(id) },
    });

    return NextResponse.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    return NextResponse.error();
  }
}
