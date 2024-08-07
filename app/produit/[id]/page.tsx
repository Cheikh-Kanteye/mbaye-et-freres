"use client";

import React from "react";
import ProductDetails from "@/components/ProductDetails";
import { useProduit } from "@/hooks/useProduits";
import Loader from "@/components/Loader";

const Produit = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data: produit, error, isLoading } = useProduit(Number(id));

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] justify-center items-center">
        <Loader size={32} color="red" />
      </div>
    );
  }

  if (!produit) {
    return (
      <p className="text-sm text-muted-foreground text-center">Aucun Produit</p>
    );
  }

  return <ProductDetails error={error} produit={produit} />;
};

export default Produit;
