"use client";
import Image from "next/image";
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
          <p className="text-xl">
            <span className="text-sm text-primary">
              {produit.familles.categories.nom},{" "}
            </span>
            <span className="font-['Rubik']">{produit.familles.nom}</span>
          </p>
        )}
        <div className="hover:bg-primary px-4 py-3 hover:text-primary-foreground rounded-full self-center shadow-lg bg-background text-foreground">
          <Link href={`/produit/${produit.id}`}>BMB-{produit.reference}</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
