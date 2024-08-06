"use client";

import React from "react";
import ProductDetails from "@/components/ProductDetails";
import { useProduit } from "@/hooks/useProduits";

const Produit = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data: produit, error, isLoading } = useProduit(Number(id));
  console.log({ produit });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors de la récupération du produit</div>;
  if (!produit) return <div>Produit non trouvé</div>;

  return <ProductDetails produit={produit} />;
};

export default Produit;
