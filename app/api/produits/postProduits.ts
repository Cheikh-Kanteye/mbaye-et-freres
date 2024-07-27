import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import { NextResponse } from "next/server";
import parseForm from "./parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToCloudinary(filePath: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: "produit_images",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );
  });
}

export async function postProduits(req: Request) {
  try {
    const { fields, files } = await parseForm(req);
    const {
      nomProduit,
      descriptionProduit,
      referenceProduit,
      idFamille,
      typeProduit,
    } = fields;

    // Traitez les fichiers
    const fileUploads = Object.values(files).map(async (file: any) => {
      const filePath = file.filepath; // Chemin temporaire
      const imageUrl = await uploadToCloudinary(filePath);

      // Supprimer le fichier temporaire après upload
      fs.unlinkSync(filePath);

      return imageUrl;
    });

    const imageUrls = await Promise.all(fileUploads);

    // Créer un produit dans la base de données
    const produit = await prisma.produit.create({
      data: {
        nomProduit,
        descriptionProduit,
        referenceProduit,
        idFamille,
        typeProduit,
        images: {
          create: imageUrls.map((url) => ({
            cheminImage: url as string,
          })),
        },
      },
    });

    return NextResponse.json(produit);
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return NextResponse.error();
  }
}
