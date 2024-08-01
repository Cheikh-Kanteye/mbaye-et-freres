import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Produit } from "@/types";

interface ProductGridListProps {
  produits?: Produit[];
}

const ProductGridList = ({ produits }: ProductGridListProps) => {
  if (!Array.isArray(produits) || produits.length <= 0)
    return (
      <section className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <p>Aucun produit à afficher</p>
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
