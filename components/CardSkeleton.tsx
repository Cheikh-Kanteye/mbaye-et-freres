"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card
      className={cn(
        "min-w-[170px] w-full h-auto bg-background border-primary-foreground shadow-lg shadow-primary-foreground rounded-lg overflow-hidden",
        className
      )}
    >
      <div className="w-full aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 h-[40%] flex flex-col gap-3 justify-items-center text-center">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-2/3 mx-auto rounded-full" />
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
