"use client";

import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Produit } from "@/types";
import Loader from "@/components/Loader";

const InfoCardList = React.lazy(() => import("@/components/InfoCardList"));
const ProductsSection = React.lazy(
  () => import("@/components/ProductsSection")
);
const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const AboutSection = React.lazy(() => import("@/components/AboutSection"));
const ServicesSection = React.lazy(
  () => import("@/components/ServicesSection")
);
const BannerSection = React.lazy(() => import("@/components/BannerSection"));

const fetchProduits = async () => {
  const response = await fetch("/api/produits");
  if (!response.ok) {
    throw new Error("Une erreur s'est produite");
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
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Suspense fallback={<Loader />}>
        <BannerSection />
        <InfoCardList />
        {isPending ? (
          <Loader /> // Afficher le loader pendant le chargement
        ) : isError ? (
          <div className="error-message">{error.message}</div> // Afficher le message d'erreur
        ) : (
          <ProductsSection
            isPending={isPending}
            isError={isError}
            error={error}
            id="produits"
            produits={produits || []}
          />
        )}
        <ServicesSection id="services" />
        <AboutSection />
        <ContactSection id="contact" />
      </Suspense>
    </main>
  );
};

export default Home;
