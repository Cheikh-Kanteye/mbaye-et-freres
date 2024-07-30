"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchProduits } from "../../_actions";
import ProductCard from "@/app/admin/components/ProductCard";
import { Produit } from "@/types";

const FamillesPage = ({ params }: { params: { familles: string } }) => {
  const nomFamille = params.familles.replace(/-/g, " ");
  const [produits, setProduits] = useState<Produit[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetchProduits(nomFamille)
      .then((result) => {
        console.log({ result });

        setProduits(result);
      })
      .finally(() => {
        setPending(false);
      });
  }, [nomFamille]);

  if (pending)
    return (
      <div className="min-h-screen max-w-screen-xl mx-auto p-4">Loading...</div>
    );

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto p-4">
      <div className="grid grid-cols-4">
        {produits.map((produit) => (
          <ProductCard produit={produit} key={produit.id} />
        ))}
      </div>
    </main>
  );
};

export default FamillesPage;
