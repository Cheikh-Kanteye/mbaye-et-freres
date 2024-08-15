"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Produit as Ptype } from "@/types";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  produit: Ptype;
  error?: Error | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ produit, error }) => {
  const { familles, specifications } = produit;
  const familleNom = familles?.nom || "";
  const categorieNom = familles?.categories?.nom || "";
  const [expanded, setExpanded] = useState(true);
  const { addToCart } = useCart();

  const cleanedSpecifications = useMemo(
    () =>
      specifications
        .map(
          (spec) =>
            spec
              .replace(/[\[\]"]+/g, "") // Retirer les crochets et les guillemets
              .trim() // Enlever les espaces inutiles
        )
        .filter((spec, index, self) => spec && self.indexOf(spec) === index), // Éviter les doublons
    [specifications]
  );

  if (error) {
    return (
      <p className="text-sm text-primary text-center">
        Erreur lors de la récupération du produit
      </p>
    );
  }

  return (
    <main className="min-h-[500px] p-4">
      <section className="max-w-screen-xl h-full mx-auto grid md:grid-cols-2 py-6 gap-3">
        <div className="bg-primary-foreground h-fit max-w-screen-sm rounded-lg overflow-hidden">
          <Image
            src={produit.image_url || "/default-image.jpg"}
            alt="produit"
            width={400}
            height={400}
            className="w-full aspect-video object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-foreground text-3xl md:text-4xl sm:text-5xl font-normal font-['Rubik'] leading-[100%]">
            {familleNom} / {categorieNom}
          </h2>
          <p className="text-lg text-primary mt-3">
            Ref.: {produit.reference || ""}
          </p>
          <div>
            {produit.description && (
              <p className={`text-base text-muted-foreground my-2`}>
                {produit.description}
              </p>
            )}

            {produit.familles.description && (
              <>
                <p
                  className={`text-base text-muted-foreground mt-2 ${
                    expanded ? "line-clamp-3" : ""
                  }`}
                >
                  {produit.familles.description}
                </p>
                <Button
                  onClick={() => setExpanded((prev) => !prev)}
                  variant={"ghost"}
                  className="flex gap-1 p-0 py-0 hover:bg-transparent hover:text-foreground text-muted-foreground"
                >
                  <p>{expanded ? "Voir plus" : "Voir moins"}</p>
                  {expanded ? <ChevronDown /> : <ChevronUp />}
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-2 mb-4">
            {cleanedSpecifications.length > 0 &&
              cleanedSpecifications.map((item, i) => (
                <Badge
                  variant={"outline"}
                  className="border-primary text-primary"
                  key={i}
                >
                  {item}
                </Badge>
              ))}
          </div>

          <Button onClick={() => addToCart(produit)}>Ajouter au panier</Button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
