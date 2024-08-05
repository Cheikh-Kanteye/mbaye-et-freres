"use client";

import CategoryList from "@/components/CategoryList";
import Loader from "@/components/Loader";
import ProductGridList from "@/components/ProductGridList";
import { Produit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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

  const [filteredProduits, setFilteredProduits] = useState<Produit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (produits) {
      if (selectedCategory === null) {
        setFilteredProduits(produits);
      } else {
        setFilteredProduits(
          produits.filter(
            (produit) => produit.familles.idCategorie === selectedCategory
          )
        );
      }
    }
  }, [produits, selectedCategory]);

  const handleCategoryChange = (id: number | null) => {
    setSelectedCategory(id);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <CategoryList
          onChange={handleCategoryChange}
          activeCategory={selectedCategory} // Passer la catégorie active
        />
        {!isError && !isPending && filteredProduits.length > 0 ? (
          <ProductGridList produits={filteredProduits} />
        ) : (
          <div className="text-center text-muted-foreground">
            Aucun produit pour cette categorie
          </div>
        )}
        {(isPending || isError) && (
          <div className="text-center">
            {isError ? (
              "Une erreur s'est produite lors de la récupération"
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
