import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { updateProduit } from "./updateProduit";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID est requise" }, { status: 400 });
  }

  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const produit = await prisma.produit.findUnique({
      where: {
        id: idNumber,
      },
      include: {
        familles: {
          include: {
            categories: true,
          },
        },
      },
    });

    if (!produit) {
      return NextResponse.json(
        { message: "Produit n'existe pas" },
        { status: 200 }
      );
    }

    return NextResponse.json(produit);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    return NextResponse.error();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log({ params: params });

  return updateProduit(req, params.id);
}
