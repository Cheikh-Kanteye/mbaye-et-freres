import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Désactiver l'analyseur de corps par défaut pour `multipart/form-data`
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function updateProduit(req: Request, id: string) {
  try {
    // Récupérer les données du formulaire
    const formData = await req.formData();
    const fields: Record<string, string> = {};
    const files: File[] = [];

    // Parcourir les champs du formulaire
    formData.forEach((value, key) => {
      if (value instanceof File) {
        files.push(value); // Ajouter le fichier s'il s'agit d'un fichier
      } else {
        fields[key] = value as string; // Sinon, ajouter la valeur comme un champ
      }
    });

    const { description, reference, type, idFamille, specifications } = fields;

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return new NextResponse(JSON.stringify({ message: "ID invalide" }), {
        status: 400,
      });
    }

    // Trouver le produit dans la base de données
    const produit = await prisma.produit.findUnique({
      where: { id: idNumber },
    });

    if (!produit) {
      return new NextResponse(
        JSON.stringify({ message: "Produit non trouvé" }),
        { status: 404 }
      );
    }

    // Variables pour gérer la mise à jour des images
    let updatedImageUrl = produit.image_url;
    let updatedPublicId = produit.public_id;

    // Si un fichier est présent, télécharger sur Cloudinary
    if (files.length > 0) {
      // Supprimer l'ancienne image sur Cloudinary si elle existe
      if (produit.public_id) {
        await cloudinary.uploader.destroy(produit.public_id);
      }

      // Télécharger la nouvelle image sur Cloudinary
      const file = files[0]; // Prendre le premier fichier
      const arrayBuffer = await file.arrayBuffer(); // Convertir en buffer
      const buffer = Buffer.from(arrayBuffer); // Créer un Buffer

      // Utiliser upload avec le buffer directement
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "produits" }, (error, result) => {
            if (error) {
              reject(new Error(`Erreur Cloudinary: ${error.message}`));
            } else {
              resolve(result);
            }
          })
          .end(buffer); // Fin de l'upload avec le buffer
      });

      updatedImageUrl = uploadResult.secure_url;
      updatedPublicId = uploadResult.public_id;
    }

    // Mettre à jour le produit dans Prisma
    const updatedProduit = await prisma.produit.update({
      where: { id: idNumber },
      data: {
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

    // Réponse avec le produit mis à jour
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
