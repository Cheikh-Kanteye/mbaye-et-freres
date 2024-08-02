import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Produit = async ({ params }: { params: { id: number } }) => {
  const produit = await prisma.produit.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      familles: {
        include: {
          categories: true,
        },
      },
    },
  });

  if (!produit) return <div>Produit existe pas</div>;
  return (
    <main className="min-h-[500px]">
      <section className="max-w-screen-xl h-full mx-auto grid sm:grid-cols-2 py-6 gap-3">
        <div className="bg-primary-foreground aspect-video grid place-items-center rounded-lg overflow-hidden">
          <Image
            src={produit.image_url}
            alt="produit"
            width={400}
            height={400}
            objectFit="contain"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-w-md flex flex-col justify-center ">
          <h2 className="text-[#001530] text-[50px] font-normal font-['Rubik'] leading-[100%]">
            {produit.familles.nom} / {produit.familles.categories.nom}
          </h2>
          <p className="text-lg text-primary mt-3">Ref.: {produit.reference}</p>
          <div>
            <p className="text-base text-muted-foreground my-2">
              {produit.familles.description}
            </p>
            <p className="text-base text-muted-foreground my-2">
              {produit.familles.categories.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Input type="number" placeholder="Quantite" />
            <Button>Ajouter au panier</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Produit;
