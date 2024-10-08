"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  categoryName: string;
  subCategoryName?: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  subCategoryName,
  className,
}) => {
  const router = useRouter();
  const handleClick = () => {
    const categorySlug = slugify(categoryName);
    if (subCategoryName) {
      const subCategorySlug = slugify(subCategoryName);
      router.push(`/categories/${categorySlug}/${subCategorySlug}`);
    } else {
      router.push(`/categories/${categorySlug}`);
    }
  };

  return (
    <Card
      className={cn(
        "text-center min-w-[18rem] w-full aspect-square h-fit overflow-hidden",
        className
      )}
    >
      <CardContent className="bg-slate-50 w-full h-full flex justify-items-center">
        <Image
          src={"/images/garde-corp.png"}
          width={400}
          height={400}
          alt="category image"
          className="w-full h-full object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
