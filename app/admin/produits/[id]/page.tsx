"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Produit as Ptype } from "@/types";

const fetchProduitById = async (id: number) => {
  const response = await fetch(`/api/produits?id=${id}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du produit");
  }
  return response.json();
};

const Produit = ({ params }: { params: { id: number } }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = params;

  const {
    data: produit,
    error,
    isLoading,
  } = useQuery<Ptype[]>({
    queryKey: ["produit", id],
    queryFn: () => fetchProduitById(Number(id)),
    staleTime: 60000,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors de la récupération du produit</div>;
  if (!produit) return <div>Produit non trouvé</div>;

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Destructuration avec valeur par défaut pour éviter undefined
  const { familles } = produit[0];
  const familleNom = familles?.nom || null;
  const familleDescription = familles?.description || null;
  const categorieNom = familles?.categories?.nom || null;
  const categorieDescription = familles?.categories?.description || null;

  return (
    <main className="min-h-[500px] p-4">
      <section className="max-w-screen-xl h-full mx-auto grid md:grid-cols-2 py-6 gap-3">
        <div className="bg-primary-foreground h-fit max-w-screen-sm rounded-lg overflow-hidden">
          <Image
            src={produit[0].image_url || "/default-image.jpg"}
            alt="produit"
            width={400}
            height={400}
            className="w-full aspect-video object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-[#001530] text-4xl sm:text-5xl font-normal font-['Rubik'] leading-[100%]">
            {familleNom} / {categorieNom}
          </h2>
          <p className="text-lg text-primary mt-3">
            Ref.: {produit[0].reference || "Référence non disponible"}
          </p>
          <div>
            <p
              className={`text-base text-muted-foreground my-2 ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {familleDescription}
            </p>
            <p
              className={`text-base text-muted-foreground my-2 ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {categorieDescription}
            </p>
            <Button
              onClick={handleToggleDescription}
              variant={"outline"}
              className="mt-2"
            >
              {isExpanded ? "Réduire" : "Lire plus"}
            </Button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Input type="number" placeholder="Quantité" />
            <Button>Ajouter au panier</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Produit;
