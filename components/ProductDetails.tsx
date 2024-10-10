"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Produit as Ptype } from "@/types";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface ProductDetailsProps {
  produit: Ptype;
  error?: Error | null;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ produit, error }) => {
  const { familles, specifications } = produit;
  const familleNom = familles?.nom || "";
  const categorieNom = familles?.categories?.nom || "";
  const [expanded, setExpanded] = useState(false); // Par défaut, la description est masquée
  const { addToCart } = useCart();

  const cleanedSpecifications = useMemo(() => {
    return specifications
      .flatMap(
        (spec) =>
          spec
            .split(",") // Diviser en éléments individuels
            .map(
              (item) =>
                item
                  .replace(/[\[\]"\\]+/g, "") // Retirer les crochets et les guillemets
                  .trim() // Enlever les espaces inutiles
            )
            .filter((spec) => spec) // Éviter les éléments vides
      )
      .filter((spec, index, self) => self.indexOf(spec) === index); // Éviter les doublons
  }, [specifications]);

  if (error) {
    return (
      <p className="text-sm text-primary text-center">
        Erreur lors de la récupération du produit
      </p>
    );
  }

  return (
    <main className="min-h-[500px] p-4 py-20 bg-gray-50">
      <section className="max-w-screen-xl h-full mx-auto grid md:grid-cols-2 py-6 gap-6">
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={produit.image_url || "/default-image.jpg"}
            alt={familleNom}
            width={400}
            height={400}
            className="w-full h-72 object-contain transition-transform duration-300 transform hover:scale-110"
            loading="lazy"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <h2 className="text-foreground text-3xl md:text-4xl sm:text-5xl font-semibold leading-tight">
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
                <motion.p
                  className={`text-base text-muted-foreground mt-2 ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expanded ? "auto" : 0,
                    opacity: expanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {produit.familles.description}
                </motion.p>
                <Button
                  onClick={() => setExpanded((prev) => !prev)}
                  variant={"ghost"}
                  className="flex gap-1 p-0 py-1 hover:bg-transparent hover:text-foreground text-muted-foreground"
                >
                  <p>{expanded ? "Voir moins" : "Voir plus"}</p>
                  {expanded ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-2 mb-4 flex-wrap">
            {cleanedSpecifications.length > 0 &&
              cleanedSpecifications.map((item, i) => (
                <Badge
                  variant={"outline"}
                  className="border-primary text-primary bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                  key={i}
                >
                  {item}
                </Badge>
              ))}
          </div>

          <Button
            onClick={() => addToCart(produit)}
            className="bg-primary text-white hover:bg-red-700 transition-colors duration-300"
          >
            Ajouter au panier
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
