import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import parseForm from "./parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { fields, files } = await parseForm(req);
    const {
      nomProduit,
      descriptionProduit,
      referenceProduit,
      idFamille,
      typeProduit,
    } = fields;

    const uploadPromises = Object.values(files).map(async (file: any) => {
      const filePath = file.filepath;
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: "produit_images",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
      return uploadResponse.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromises);

    const produit = await prisma.produit.update({
      where: { idProduit: parseInt(id) },
      data: {
        nomProduit,
        descriptionProduit,
        referenceProduit,
        idFamille,
        typeProduit,
        images: {
          create: imageUrls.map((url) => ({
            cheminImage: url,
          })),
        },
      },
    });

    return NextResponse.json(produit);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    return NextResponse.error();
  }
}
