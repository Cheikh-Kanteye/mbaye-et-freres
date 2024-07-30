"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify"; // Assurez-vous que slugify est bien importé
import { DrawerClose } from "./ui/drawer";
import { useQuery } from "@tanstack/react-query";
import { Categorie, CategorieWFamille } from "@/types";

const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const SubCategories: React.FC = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<CategorieWFamille[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const router = useRouter();

  const generateCategoryHref = (categoryName: string) => {
    return `/categories/${slugify(categoryName)}`;
  };

  const generateSubCategoryHref = (
    categoryName: string,
    subCategoryName: string
  ) => {
    return `/categories/${slugify(categoryName)}/${slugify(subCategoryName)}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!categories) return <div>Aucune categories</div>;

  return (
    <div className="w-full px-4">
      {categories.map((category) => (
        <Accordion type="single" collapsible key={category.id} className="mb-2">
          <AccordionItem value={`item-${category.id}`}>
            <AccordionTrigger className="capitalize">
              {category.nom}
            </AccordionTrigger>
            <AccordionContent>
              {category.familles.length > 0 ? (
                <ul className="pl-4">
                  {category.familles.map((sub) => (
                    <li key={sub.id} className="capitalize">
                      <DrawerClose asChild>
                        <a
                          href={generateSubCategoryHref(category.nom, sub.nom)}
                          className="hover:text-primary py-1 capitalize hover:underline"
                        >
                          {sub.nom}
                        </a>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-2">
                  <a
                    href={generateCategoryHref(category.nom)}
                    className="text-foreground hover:text-primary hover:underline font-medium capitalize"
                  >
                    {category.nom}
                  </a>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default SubCategories;
