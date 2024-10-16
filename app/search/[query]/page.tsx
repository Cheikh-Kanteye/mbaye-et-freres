"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader"; // Remplacer par ton composant Loader si nécessaire
import ProductGridList from "@/components/ProductGridList";
import { Produit } from "@/types";

const SearchResults = ({ query }: { query: string | null }) => {
  const [searchResults, setSearchResults] = useState<Produit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async (searchTerm: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/search/${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits.");
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="w-full grid place-content-center">
        <Loader size={20} color="red" /> {/* Remplacer par ton loader */}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Erreur : {error}</div>;
  }

  if (searchResults.length > 0) {
    return <ProductGridList produits={searchResults} />;
  }

  return <p>Aucun produit trouvé.</p>;
};

const Search = () => {
  const { query } = useParams<{ query: string }>();

  return (
    <Suspense fallback={<Loader size={20} color="red" />}>
      <div className="min-h-screen max-w-screen-lg mx-auto py-6">
        <h1>Résultats de recherche pour : {query}</h1>
        <SearchResults query={query} />
      </div>
    </Suspense>
  );
};

export default Search;
