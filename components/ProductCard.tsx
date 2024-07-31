"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Produit } from "@/types";

const ProductCard = ({ produit }: { produit: Produit }) => {
  return (
    <div className="w-[18rem] h-[20rem] bg-slate-50 rounded-lg overflow-hidden">
      <div className="w-full h-[60%]">
        <Image
          src={produit.image_url}
          alt={produit.type}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 h-[40%] flex flex-col gap-3 justify-items-center text-center">
        {produit.familles && (
          <p className="text-lg">
            <span className="text-sm">{produit.familles.categories.nom}: </span>
            {produit.familles.nom}
          </p>
        )}
        <Button className="hover:bg-primary hover:text-primary-foreground rounded-full self-center shadow-lg bg-background text-foreground">
          <Link href={`/produit/${produit.id}`}>BMB-{produit.reference}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
