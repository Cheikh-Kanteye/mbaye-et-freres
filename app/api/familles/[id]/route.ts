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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log(`Received PUT request with id: ${id}`);

  if (!id) {
    console.error("ID is missing in the request parameters.");
    return NextResponse.json({ error: "ID est requise" }, { status: 400 });
  }

  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    console.error(`Invalid ID provided: ${id}`);
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const { nom, description, idCategorie } = await req.json();
    console.log("Request body:", { nom, description, idCategorie });

    if (!nom || !description || !idCategorie) {
      console.error("Missing required fields in request body.");
      return NextResponse.json(
        { error: "Les champs nom, description et idCategorie sont requis" },
        { status: 400 }
      );
    }

    console.log("Updating famille with data:", {
      id: idNumber,
      nom,
      description,
      idCategorie,
    });

    const famille = await prisma.familles.update({
      where: { id: idNumber },
      data: {
        nom,
        description,
        idCategorie,
      },
    });

    console.log("Famille updated successfully:", famille);
    return NextResponse.json(famille);
  } catch (error) {
    console.error("Error updating famille:", error);
    return NextResponse.error();
  }
}
