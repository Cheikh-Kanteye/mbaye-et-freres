import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Produit } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  produits: Produit[];
  className?: string;
}

export function ProductCarouselCard({ produits, className }: Props) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent className="pl-6">
        {produits.map((produit, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-0 shadow-none">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <ProductCard produit={produit} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-2" />
      <CarouselNext className="mr-2" />
    </Carousel>
  );
}
