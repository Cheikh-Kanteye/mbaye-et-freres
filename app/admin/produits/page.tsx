"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductList from "../components/ProductList";
import { Produit } from "@/types";

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
  } = useQuery<Produit[], Error>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
  });

  if (error)
    return <p>Erreur lors du chargement des produits: {error.message}</p>;

  return (
    <main className="p-4">
      <ProductList pending={isPending} data={produits || []} />
    </main>
  );
};

export default Produits;
