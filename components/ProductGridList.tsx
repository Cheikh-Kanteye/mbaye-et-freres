import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Produit } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductGridListProps {
  produits: Produit[];
  className?: string;
}

const ProductGridList = ({ produits, className }: ProductGridListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(produits.length / productsPerPage);

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
          <motion.div
            key={produit.id}
            className="w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard produit={produit} />
          </motion.div>
        ))}
      </div>

      {/* Amélioration de la pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav>
            <ul className="flex items-center space-x-2">
              {/* Bouton pour aller à la première page */}
              <li>
                <button
                  className={cn(
                    "px-3 py-1 border rounded",
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-primary hover:bg-gray-200"
                  )}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  &lt;&lt; {/* Flèche gauche double */}
                </button>
              </li>

              {/* Bouton pour aller à la page précédente */}
              <li>
                <button
                  className={cn(
                    "px-3 py-1 border rounded",
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-primary hover:bg-gray-200"
                  )}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; {/* Flèche gauche */}
                </button>
              </li>

              {/* Affichage des numéros de pages */}
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <li key={page}>
                    <button
                      className={cn(
                        "px-3 py-1 border rounded",
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white text-primary hover:bg-gray-200"
                      )}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}

              {/* Bouton pour aller à la page suivante */}
              <li>
                <button
                  className={cn(
                    "px-3 py-1 border rounded",
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-primary hover:bg-gray-200"
                  )}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt; {/* Flèche droite */}
                </button>
              </li>

              {/* Bouton pour aller à la dernière page */}
              <li>
                <button
                  className={cn(
                    "px-3 py-1 border rounded",
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-primary hover:bg-gray-200"
                  )}
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  &gt;&gt; {/* Flèche droite double */}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default ProductGridList;
