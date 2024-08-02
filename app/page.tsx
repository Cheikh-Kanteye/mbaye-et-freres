"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Produit } from "@/types";
import { infoCards } from "@/constants/contacts";
import { Button } from "@/components/ui/button";
import BannerSection from "@/components/BannerSection";

// Chargement dynamique des composants
const InfoCard = dynamic(() => import("@/components/InfoCard"));
const Loader = dynamic(() => import("@/components/Loader"));
const ProductGridList = dynamic(() => import("@/components/ProductGridList"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const ProductsSection = dynamic(() => import("@/components/ProductsSection"));

const fetchProduits = async () => {
  const response = await fetch("/api/produits");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Home = () => {
  const {
    data: produits,
    isPending,
    isError,
    error,
  } = useQuery<Produit[]>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
  });

  if (isError)
    return (
      <div className="text-red-600">
        Erreur de chargement des produits : {error.message}
      </div>
    );

  return (
    <main className="min-h-screen bg-background">
      <BannerSection />

      <section className="bg-background py-8">
        <div className="container grid md:grid-flow-col gap-4 p-4 justify-center">
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              iconSrc={card.iconSrc}
              bgColor={card.bgColor}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <ProductsSection
        produits={produits || []}
        isPending={isPending}
        isError={isError}
        error={error}
      />

      <Testimonials />
    </main>
  );
};

export default Home;
