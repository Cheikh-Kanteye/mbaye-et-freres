"use client";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Produit } from "@/types";
import { infoCards } from "@/constants/contacts";
import BannerSection from "@/components/BannerSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";

const InfoCard = dynamic(() => import("@/components/InfoCard"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const ProductsSection = dynamic(() => import("@/components/ProductsSection"));
const ContactSection = dynamic(() => import("@/components/ContactSection"));

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

      <section className="bg-background py-8">
        <div className="container grid md:grid-flow-col gap-4 py-6 md:py-10 lg:py-14 justify-center">
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
        id="produits"
        produits={produits || []}
        isPending={isPending}
        isError={isError}
        error={error}
      />

      <ServicesSection id="services" />

      <AboutSection />

      <Testimonials id="testimonials" />

      <ContactSection id="contact" />
    </main>
  );
};

export default Home;
