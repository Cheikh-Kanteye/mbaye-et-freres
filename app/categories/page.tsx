"use client";

import CategoryList from "@/components/CategoryList";
import GridSkeleton from "@/components/GridSkeleton";
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
  return await response.json();
};

const Categories = () => {
  const {
    data: produits,
    isLoading,
    isError,
  } = useQuery<Produit[]>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
  });

  const [filteredProduits, setFilteredProduits] = useState<Produit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (produits && Array.isArray(produits)) {
      setFilteredProduits(
        produits.filter(
          (produit) =>
            selectedCategory === null ||
            produit.familles.idCategorie === selectedCategory
        )
      );
    }
  }, [produits, selectedCategory]);

  const handleCategoryChange = (id: number | null) => setSelectedCategory(id);

  const renderProductsSection = (type: "produit" | "accessoire") => {
    const productsOfType = filteredProduits.filter((p) => p.type === type);
    if (productsOfType.length === 0) return null;
    return (
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">
          {type === "produit" ? "Nos Produits" : "Nos Accessoires"}
        </h2>
        <ProductGridList produits={productsOfType} />
      </section>
    );
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <CategoryList
          onChange={handleCategoryChange}
          activeCategory={selectedCategory}
        />
        {renderProductsSection("produit")}
        {renderProductsSection("accessoire")}
        {isLoading && <GridSkeleton />}
        {isError && (
          <div className="text-center text-red-500">
            Une erreur s&apos;est produite lors de la récupération des produits.
            Veuillez réessayer plus tard.
          </div>
        )}
      </div>
    </main>
  );
};

export default Categories;
