import { produit } from "@prisma/client";
import React from "react";
import ProductCard from "./ProductCard";
import { Produit } from "@/types";

const ProductGridList = ({ produits }: { produits: Produit[] | undefined }) => {
  if (!produits)
    return (
      <section className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <p>Aucune produit a afficher</p>
      </section>
    );
  return (
    <section className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {produits.map((produit) => (
        <ProductCard key={produit.id} produit={produit} />
      ))}
    </section>
  );
};

export default ProductGridList;
