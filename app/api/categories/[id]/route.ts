import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function PUT(
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
    const { nom, description } = await req.json();
    console.log({ id, nom, description });

    if (!id) {
      return NextResponse.error();
    }

    const categorie = await prisma.categories.update({
      where: { id: idNumber },
      data: {
        nom,
        description,
      },
    });

    return NextResponse.json(categorie);
  } catch (error) {
    console.error("Error updating categorie:", error);
    return NextResponse.error();
  }
}
