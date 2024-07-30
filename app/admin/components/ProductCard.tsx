import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Produit } from "@/types";

export default function ProductCard({ produit }: { produit: Produit }) {
  return (
    <Card className="w-[18rem] rounded-xl border width overflow-hidden">
      <div className="w-full aspect-4/5">
        <Image
          src={produit.images[0].url}
          alt="Product image"
          width="400"
          height="400"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid gap-1.5 p-3">
        <p className="text-sm md:text-base text-foreground">
          {produit.familles.categories.nom}
        </p>
        <p className="text-sm md:text-base text-foreground">
          {produit.familles.nom}
        </p>
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
