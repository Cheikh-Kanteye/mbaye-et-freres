import { useQuery } from "@tanstack/react-query";
import { Produit as Ptype } from "@/types";

const fetchProduitById = async (id: number) => {
  const response = await fetch(`/api/produits/${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du produit");
  }
  console.log({ id });

  return response.json();
};

export const useProduit = (id: number) => {
  return useQuery<Ptype>({
    queryKey: ["produit", id],
    queryFn: () => fetchProduitById(id),
    staleTime: 60000,
  });
};
