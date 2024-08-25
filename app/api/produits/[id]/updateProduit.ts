import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { saveFileLocally } from "@/lib/saveFileLocally";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function updateProduit(req: Request, id: string) {
  try {
    const formData = await req.formData();
    const fields: Record<string, string> = {};
    const files: File[] = [];

    formData.forEach((value, key) => {
      if (value instanceof File) {
        files.push(value);
      } else {
        fields[key] = value as string;
      }
    });

    const { description, reference, type, idFamille, specifications } = fields;

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return new NextResponse(JSON.stringify({ message: "ID invalide" }), {
        status: 400,
      });
    }

    const produit = await prisma.produit.findUnique({
      where: { id: idNumber },
    });

    if (!produit) {
      return new NextResponse(
        JSON.stringify({ message: "Produit non trouvé" }),
        { status: 404 }
      );
    }

    const saveDir = path.join(process.cwd(), "public", "produits");

    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    let updatedImageUrl = produit.image_url;
    let updatedPublicId = produit.public_id;

    if (files.length > 0) {
      if (produit.public_id) {
        const oldFilePath = path.join(saveDir, produit.public_id);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const fileUploads = files.map(async (file) => {
        try {
          const { filePath, fileName } = await saveFileLocally(file, saveDir);
          updatedImageUrl = `/produits/${fileName}`;
          updatedPublicId = fileName;
        } catch (error) {
          console.error("File upload error:", error);
          throw error;
        }
      });

      await Promise.all(fileUploads);
    }

    const updatedProduit = await prisma.produit.update({
      where: { id: idNumber },
      data: {
        // Mettre à jour uniquement les champs fournis
        description: description || produit.description,
        reference: reference || produit.reference,
        idFamille: idFamille ? parseInt(idFamille, 10) : produit.idFamille,
        type: type || produit.type,
        specifications: specifications
          ? specifications.split(",")
          : produit.specifications,
        public_id: updatedPublicId, // Nouveau public_id ou ancien si pas de nouvelle image
        image_url: updatedImageUrl, // Nouveau chemin de l'image ou ancien si pas de nouvelle image
      },
    });

    return new NextResponse(JSON.stringify(updatedProduit), { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    return new NextResponse(
      JSON.stringify({
        message:
          error.message ||
          "Une erreur interne est survenue lors de la mise à jour du produit. Veuillez réessayer plus tard.",
      }),
      { status: 500 }
    );
  }
}
