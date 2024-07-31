import { produit as Produit } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const ProductCard = ({ produit }: { produit: Produit }) => {
  return (
    <div className="w-[18rem] h-[20rem] bg-slate-50 rounded-lg overflow-hidden">
      <div className="w-full h-[60%]">
        <Image
          src={produit.image_url}
          alt={produit.type}
          width={400}
          height={400}
          className=" w-full h-full object-contain"
        />
      </div>
      <div className="p-4 h-[40%] flex flex-col gap-3 justify-items-center text-center">
        <p>
          <span>{"categorie"}: </span>
          {"famille"}
        </p>
        <Button className="hover:bg-primary hover:text-primary-foreground rounded-full self-center shadow-lg bg-background text-foreground">
          BMB-{produit.reference}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
