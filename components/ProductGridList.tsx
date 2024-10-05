import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Produit } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridListProps {
  produits: Produit[];
  className?: string;
}

const ProductGridList = ({ produits, className }: ProductGridListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Nombre de produits par page

  // Calculer l'index des produits à afficher
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(produits.length / productsPerPage);

  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!Array.isArray(produits) || produits.length <= 0) {
    return (
      <section className="py-6 w-full text-center">
        <p>Aucun produit à afficher</p>
      </section>
    );
  }

  return (
    <section className={cn("py-6", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentProducts.map((produit) => (
          <ProductCard className="w-full" key={produit.id} produit={produit} />
        ))}
      </div>

      {/* Afficher la pagination seulement si le nombre total de produits est supérieur à 20 */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button
                    className={cn(
                      "px-3 py-1 border rounded",
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    )}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {totalPages > 5 && (
                <li>
                  <span className="px-3 py-1">...</span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default ProductGridList;
