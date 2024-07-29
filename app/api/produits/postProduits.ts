import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToCloudinary(filePath: string): Promise<string> {
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
          resolve(result?.secure_url as string);
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

    const { description, reference, idFamille, specifications } = fields;

    const tempDir = path.join(__dirname, "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const fileUploads = files.map(async (file: any) => {
      try {
        const filePath = path.join(tempDir, file.name);
        await fs.promises.writeFile(
          filePath,
          Buffer.from(await file.arrayBuffer())
        );
        const imageUrl = await uploadToCloudinary(filePath);
        await fs.promises.unlink(filePath);
        return imageUrl;
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
        type: "produit",
        specifications,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
    });

    console.log("Produit créé:", produit);

    return NextResponse.json(produit);
  } catch (error: any) {
    console.error("Erreur lors de la création du produit:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
