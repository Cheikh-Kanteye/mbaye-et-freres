"use client";

import InfoCard from "@/components/InfoCard";
import Loader from "@/components/Loader";
import ProductGridList from "@/components/ProductGridList";
import Testimonials from "@/components/Testimonials";
import { infoCards } from "@/constants/contacts";
import { Produit } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const fetchProduits = async () => {
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

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className="min-h-screen bg-background">
      <section className="home-banner w-dvw h-[50vh] flex items-center justify-center">
        <div className="container flex flex-col items-start justify-center h-full">
          <h1 className="text-4xl lg:text-5xl text-foreground font-bold">
            <span className="block text-xl font-medium text-primary">
              Etablissement
            </span>
            Mbaye & Frères
          </h1>
          <p className="max-w-md text-slate-700 mt-4">
            Transformons vos espaces avec expertise, qualité et passion.
            Réalisons ensemble vos rêves les plus ambitieux.
          </p>
        </div>
      </section>

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
      <section>
        <div className="container flex-col mt-8">
          <h2 className="text-2xl font-bold mb-4">Nos produits</h2>
          {isPending ? (
            <Loader size={28} color="red" />
          ) : (
            <ProductGridList produits={produits} />
          )}
        </div>
      </section>
      <Testimonials />
    </main>
  );
};

export default Home;
