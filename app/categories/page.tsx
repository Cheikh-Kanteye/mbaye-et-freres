"use client";

import CategoryList from "@/components/CategoryList";
import Loader from "@/components/Loader";
import ProductGridList from "@/components/ProductGridList";
import { Produit } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchProduits = async () => {
  const response = await fetch("/api/produits");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Categories = () => {
  const {
    data: produits,
    isPending,
    isError,
  } = useQuery<Produit[]>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
  });

  const filteredProduits = produits || [];

  return (
    <main className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <CategoryList />
        {!isError && !isPending && filteredProduits.length > 0 ? (
          <ProductGridList produits={filteredProduits} />
        ) : null}
        {(isPending || isError) && (
          <div className="text-center">
            {isError ? (
              "Une erreur s'est produite lors de la recuperation"
            ) : (
              <Loader color="red" />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Categories;
