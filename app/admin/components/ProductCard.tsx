import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { produit as Produit } from "@prisma/client";

export default async function ProductCard({ produit }: { produit: Produit }) {
  const famille = await prisma?.familles.findUnique({
    where: {
      id: produit.idFamille,
    },
  });
  const categorie = await prisma?.categories.findUnique({
    where: {
      id: famille?.idCategorie,
    },
  });
  return (
    <Card className="w-[18rem] rounded-xl border width overflow-hidden">
      <div className="w-full aspect-4/5">
        <Image
          src={produit.image_url}
          alt="Product image"
          width="400"
          height="400"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid gap-1.5 p-3">
        <p className="text-sm md:text-base text-foreground">{famille?.nom}</p>
        <p className="text-sm md:text-base text-foreground">{categorie?.nom}</p>
        <h3 className="font-semibold text-sm md:text-base">
          {produit.reference}
        </h3>
        <p className="text-sm md:text-base text-foreground">
          {produit.description}
        </p>
        <Button size="sm">Add to cart</Button>
      </div>
    </Card>
  );
}
