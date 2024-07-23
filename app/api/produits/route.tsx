// pages/api/produits/index.js

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const produits = await prisma.produit.findMany({
        include: {
          categorie: true,
          images: true,
        },
      });
      res.status(200).json(produits);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des produits" });
    }
  } else {
    res.status(405).end(); // Méthode non autorisée
  }
}
