"use client";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Produit } from "@/types";

const InfoCardList = dynamic(() => import("@/components/InfoCardList"));
const ProductsSection = dynamic(() => import("@/components/ProductsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const BannerSection = dynamic(() => import("@/components/BannerSection"));

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
      <BannerSection />

      <InfoCardList />

      <ProductsSection
        id="produits"
        produits={produits || []}
        isPending={isPending}
        isError={isError}
        error={error}
      />

      <ServicesSection id="services" />

      <AboutSection />

      <ContactSection id="contact" />
    </main>
  );
};

export default Home;
