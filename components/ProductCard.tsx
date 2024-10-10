"use client";
import Image from "next/image";
import Link from "next/link";
import { Produit } from "@/types";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

const ProductCard = ({
  produit,
  className,
}: {
  produit: Produit;
  className?: string;
}) => {
  return (
    <Link href={`/produit/${produit.id}`}>
      <Card
        className={cn(
          "max-w-[16rem] w-full h-auto bg-background border-primary-foreground shadow-lg shadow-primary-foreground hover-animate rounded-lg overflow-hidden",
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
            <p className="text-lg leading-none sm:text-xl">
              <span className="text-sm text-primary">
                {produit.familles.categories.nom}
                <br />
              </span>
              <span className="font-['Rubik'] truncate max-w-[10ch]">
                {produit.familles.nom}
              </span>
            </p>
          )}
          <div className="hover:bg-primary px-4 text-sm md:text-base py-3 hover:text-primary-foreground rounded-full self-center shadow-lg bg-background text-foreground">
            <p>BMB-{produit.reference}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
