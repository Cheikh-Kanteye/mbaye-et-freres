"use client";
import Image from "next/image";
import Link from "next/link";
import { Produit } from "@/types";
import { cn } from "@/lib/utils";

const ProductCard = ({
  produit,
  className,
}: {
  produit: Produit;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-[16rem] h-auto bg-slate-50 rounded-lg overflow-hidden",
        className
      )}
    >
      <div className="w-full aspect-video">
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
          <p className="text-lg sm:text-xl">
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
