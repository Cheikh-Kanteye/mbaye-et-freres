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

export async function postProduits(req: Request) {
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

    const {
      description,
      reference,
      type,
      idFamille,
      idCategorie,
      specifications,
    } = fields;

    // Vérifier si la référence existe déjà
    const existingProduit = await prisma.produit.findUnique({
      where: { reference },
    });

    if (existingProduit) {
      return new Response(
        JSON.stringify({
          message:
            "La référence du produit existe déjà. Veuillez vérifier la référence et réessayer.",
        }),
        {
          status: 400,
        }
      );
    }

    // Vérifier si l'idFamille existe
    const familleExists = await prisma.familles.findUnique({
      where: { id: parseInt(idFamille, 10) },
    });

    if (!familleExists) {
      return new Response(
        JSON.stringify({
          message:
            "La famille spécifiée n'existe pas. Veuillez vérifier la famille sélectionnée et réessayer.",
        }),
        {
          status: 400,
        }
      );
    }

    const saveDir = path.join(process.cwd(), "public", "produits");

    // Créer le répertoire si nécessaire
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true });
    }

    const fileUploads = files.map(async (file) => {
      try {
        const { filePath, fileName } = await saveFileLocally(file, saveDir);
        return { filePath, fileName };
      } catch (error) {
        console.error("File upload error:", error);
        throw error;
      }
    });

    const savedFiles = await Promise.all(fileUploads);

    const produit = await prisma.produit.create({
      data: {
        description,
        reference,
        idFamille: parseInt(idFamille, 10),
        type,
        specifications: specifications ? specifications.split(",") : [],
        idCategorie: familleExists.idCategorie, // Utiliser l'idCategorie fourni
        public_id: savedFiles[0]?.fileName || "", // Assumons que chaque produit a une seule image principale
        image_url: `/produits/${savedFiles[0]?.fileName || ""}`, // Chemin de l'image enregistrée
      },
    });

    return NextResponse.json(produit);
  } catch (error: any) {
    console.error("Erreur lors de la création du produit:", error);
    return new Response(
      JSON.stringify({
        message:
          error.message ||
          "Une erreur interne est survenue lors de la création du produit. Veuillez réessayer plus tard.",
      }),
      {
        status: 500,
      }
    );
  }
}
