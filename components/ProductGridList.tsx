import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Produit } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridListProps {
  produits: Produit[];
  className?: string;
}

const ProductGridList = ({ produits, className }: ProductGridListProps) => {
  if (!Array.isArray(produits) || produits.length <= 0)
    return (
      <section className="py-6 w-full text-center">
        <p>Aucun produit à afficher</p>
      </section>
    );

  return (
    <section
      className={cn(
        "py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        className
      )}
    >
      {produits.map((produit) => (
        <ProductCard className="w-full" key={produit.id} produit={produit} />
      ))}
    </section>
  );
};

export default ProductGridList;
