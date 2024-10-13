"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader"; // Remplacer par ton composant Loader si nécessaire
import { useSearchParams } from "next/navigation";
import ProductGridList from "@/components/ProductGridList";
import { Produit } from "@/types";

const Search = () => {
  const router = useSearchParams();
  const query = router.get("query"); // Utiliser get pour extraire le paramètre de l'URL
  const [searchResults, setSearchResults] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async (searchTerm: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(searchTerm)}`
        ); // Encoder le searchTerm

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits.");
        }

        const data = await response.json();
        setSearchResults(data); // Assurez-vous que l'API retourne un tableau de produits
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      const searchTerm = query as string;
      fetchSearchResults(searchTerm);
    }
  }, [query]);

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto py-6">
      <h1>Résultats de recherche pour : {query}</h1>

      {isLoading ? (
        <div className="w-full grid place-content-center">
          <Loader size={20} color="red" /> {/* Remplacer par ton loader */}
        </div>
      ) : error ? (
        <div className="text-red-600">Erreur : {error}</div>
      ) : searchResults.length > 0 ? (
        <ProductGridList produits={searchResults} />
      ) : (
        <p>Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default Search;
