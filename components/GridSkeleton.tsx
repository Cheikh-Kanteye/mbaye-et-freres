import React from "react";
import ProductCardSkeleton from "./CardSkeleton";
import { cn } from "@/lib/utils";

const GridSkeleton = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
        className
      )}
    >
      {new Array(5).fill("").map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </section>
  );
};

export default GridSkeleton;
