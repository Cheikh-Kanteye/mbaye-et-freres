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
import { CategorieWFamille } from "@/types";
import Link from "next/link";
import Loader from "@/components/Loader";

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

  const generateCategoryHref = (idCategory: string) => {
    return `/categories/${idCategory}`;
  };

  // Modifié pour prendre idFamille en argument
  const generateSubCategoryHref = (idCategory: string, idFamille: string) => {
    return `/categories/${idCategory}/${idFamille}`;
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full px-4">
      {isLoading ? (
        <div className="w-full grid place-content-center">
          <Loader size={20} color="red" />
        </div>
      ) : categories ? (
        categories.map((category) => (
          <Accordion
            type="single"
            collapsible
            key={category.id}
            className="mb-2"
          >
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
                          <Link
                            href={generateSubCategoryHref(
                              category.id.toString(),
                              sub.id.toString() // Convertir en chaîne si nécessaire
                            )}
                            className="hover:text-primary py-1 capitalize hover:underline"
                          >
                            {sub.nom}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-2">
                    <a
                      href={generateCategoryHref(category.id.toString())}
                      className="text-foreground hover:text-primary hover:underline font-medium capitalize"
                    >
                      {category.nom}
                    </a>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <div className="text-center text-muted-foreground">
          Aucun categorie disponible
        </div>
      )}
    </div>
  );
};

export default SubCategories;
