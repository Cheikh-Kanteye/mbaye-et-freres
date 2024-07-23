"use client";

import InfoCard from "@/components/InfoCard";
import { infoCards } from "@/constants/contacts";
import { Produit } from "@/types";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
  const [produits, setProduits] = useState<Produit[] | never[]>([]);

  useEffect(() => {
    async function fetchProduits() {
      console.log("fetching...");

      const res = await fetch("/api/produits");
      const data = await res.json();
      setProduits(data);
      console.log(data);
    }
    fetchProduits();
  }, []);

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

      <section className="container">
        <div>
          <h1>Liste des Produits</h1>
          <ul>
            {produits.map((produit) => (
              <li key={produit.id}>
                <h2>{produit.nom}</h2>
                <p>{produit.description}</p>
                <p>Prix: {produit.prix}</p>
                <p>Specifications: {produit.specifications}</p>
                <p>Categorie: {produit.categorie.nom}</p>
                <div>
                  {/* {produit.images.map((image) => (
                  <img key={image.id} src={image.url} alt={produit.nom} />
                ))} */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Page;
