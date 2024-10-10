"use client";
import { useQuery } from "@tanstack/react-query";
import { Produit } from "@/types";
import GridSkeleton from "@/components/GridSkeleton";

import InfoCardList from "@/components/InfoCardList";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BannerSection from "@/components/BannerSection";

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
    isLoading,
    isError,
    error,
  } = useQuery<Produit[]>({
    queryKey: ["produits"],
    queryFn: fetchProduits,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <BannerSection />
      <InfoCardList />
      {isLoading ? ( // Utiliser isLoading de React Query
        <GridSkeleton /> // Afficher le loader pendant le chargement
      ) : isError ? (
        <div className="error-message">{error.message}</div> // Afficher le message d'erreur
      ) : (
        <ProductsSection id="produits" produits={produits || []} />
      )}
      <ServicesSection id="services" />
      <AboutSection />
      <ContactSection id="contact" />
    </main>
  );
};

export default Home;
