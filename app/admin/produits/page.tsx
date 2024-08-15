"use client";
import { useQuery } from "@tanstack/react-query";
import ProductList from "../_components/ProductList";
import { produit } from "@prisma/client";

const fetchProduits = async () => {
  const res = await fetch("/api/produits");

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

const Produits = () => {
  const {
    data: produits,
    error,
    isPending,
  } = useQuery<produit[], Error>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
  });

  return (
    <section className="p-4">
      <ProductList pending={isPending} data={produits || []} />
      {error && (
        <p className="text-sm text-destructive text-center">
          Erreur lors du chargement des produits: {error.message}
        </p>
      )}
    </section>
  );
};

export default Produits;
