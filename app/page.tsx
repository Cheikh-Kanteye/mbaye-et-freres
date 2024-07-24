"use client";
import InfoCard from "@/components/InfoCard";
import { infoCards } from "@/constants/contacts";
import { useEffect, useState } from "react";
import { Produit } from "@/types";
import Image from "next/image";

const Home: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    async function fetchProduits() {
      console.log("fetching...");
      try {
        const res = await fetch("/api/produits");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: Produit[] = await res.json();
        setProduits(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching produits:", error);
      }
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

      <section className="container py-6">
        <div>
          <h1 className="mb-3 text-2xl">Liste des Produits (testing)</h1>
          <ul className="gap-3 flex flex-wrap justify-center">
            {produits.map((produit, i) => (
              <li
                key={produit.id || i}
                className="border rounded-sm p-3 w-[18rem] hover:bg-gradient-to-t from-primary-foreground to-background"
              >
                <h2>{produit.nom}</h2>
                <p>{produit.description}</p>
                <p>Prix: {produit.prix} €</p>
                <p>Specifications: {produit.specifications}</p>
                <p>Categorie: {produit.categorie.nom}</p>
                <div>
                  {produit.images.map((image) => (
                    <Image
                      key={image.id}
                      src={image.url}
                      alt={produit.nom}
                      width={100}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
