"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Produit as Ptype } from "@/types";
import { Badge } from "./ui/badge";

interface ProductDetailsProps {
  produit: Ptype;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ produit }) => {
  const { familles, specifications } = produit;
  const familleNom = familles?.nom || "";
  const categorieNom = familles?.categories?.nom || "";

  // Nettoyer et formater les spécifications
  const cleanedSpecifications = specifications
    .map(
      (spec) =>
        // Supprimer les crochets et les guillemets
        spec
          .replace(/[\[\]"]+/g, "") // Retirer les crochets et les guillemets
          .trim() // Enlever les espaces inutiles
    )
    .filter((spec, index, self) => spec && self.indexOf(spec) === index); // Éviter les doublons

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
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-[#001530] text-4xl sm:text-5xl font-normal font-['Rubik'] leading-[100%]">
            {familleNom} / {categorieNom}
          </h2>
          <p className="text-lg text-primary mt-3">
            Ref.: {produit.reference || ""}
          </p>
          <div>
            <p className={`text-base text-muted-foreground my-2`}>
              {produit.description}
            </p>
          </div>
          <div className="flex gap-2">
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
          <div className="flex flex-col gap-2 mt-4">
            <Input type="number" placeholder="Quantité" />
            <Button>Ajouter au panier</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
