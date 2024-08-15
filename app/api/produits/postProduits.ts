import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import path from "path";
import tmp from "tmp";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToCloudinary(
  filePath: string
): Promise<{ url: string; public_id: string }> {
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
          console.log("Cloudinary error:", error);
          reject("Cloudinary error: " + error);
        } else {
          resolve({
            url: result?.secure_url as string,
            public_id: result?.public_id as string,
          });
        }
      }
    );
  });
}

export async function postProduits(req: Request) {
  try {
    const formData = await req.formData();
    const fields: any = {};
    const files: any = [];

    formData.forEach((value, key) => {
      if (value instanceof File) {
        files.push(value);
      } else {
        fields[key] = value;
      }
    });

    console.log("Fields:", fields);
    console.log("Files:", files);

    const { description, reference, type, idFamille, specifications } = fields;

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
            "La famille spécifiée n'existe pas. Veuillez vérifier de la famille selectionner et réessayer.",
        }),
        {
          status: 400,
        }
      );
    }

    const tempDir = tmp.dirSync().name;

    const fileUploads = files.map(async (file: any) => {
      try {
        const filePath = path.join(tempDir, file.name);
        await fs.promises.writeFile(
          filePath,
          Buffer.from(await file.arrayBuffer())
        );
        const { url, public_id } = await uploadToCloudinary(filePath);
        await fs.promises.unlink(filePath);
        return { url, public_id };
      } catch (error) {
        console.error("File upload error:", error);
        throw error;
      }
    });

    const imageUrls = await Promise.all(fileUploads);

    console.log("Image URLs:", imageUrls);

    const produit = await prisma.produit.create({
      data: {
        description,
        reference,
        idFamille: parseInt(idFamille, 10),
        type,
        specifications: Array.isArray(specifications)
          ? specifications
          : specifications
          ? specifications.split(",")
          : [],
        public_id: imageUrls[0]?.public_id || "", // Assumons que chaque produit a une seule image principale
        image_url: imageUrls[0]?.url || "", // Assumons que chaque produit a une seule image principale
      },
    });

    console.log("Produit créé:", produit);

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
