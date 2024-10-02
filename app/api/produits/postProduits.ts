import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Uploader les fichiers sur Cloudinary
    const fileUploads = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "produits" }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(buffer);
      });
    });

    const savedFiles: any[] = await Promise.all(fileUploads);

    const produit = await prisma.produit.create({
      data: {
        description,
        reference,
        idFamille: parseInt(idFamille, 10),
        type,
        specifications: specifications ? specifications.split(",") : [],
        idCategorie: familleExists.idCategorie,
        public_id: savedFiles[0]?.public_id || "", // Identifiant public Cloudinary
        image_url: savedFiles[0]?.secure_url || "", // URL de l'image sur Cloudinary
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
