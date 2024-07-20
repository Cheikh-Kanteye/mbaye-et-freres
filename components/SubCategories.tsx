"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { categories } from "@/constants/categories";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify"; // Assurez-vous que slugify est bien importé
import { DrawerClose } from "./ui/drawer";

const SubCategories: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    const slugCategory = slugify(categoryName);
    router.push(`/categories/${slugCategory}`);
  };

  const handleSubCategoryClick = (
    categoryName: string,
    subCategoryName: string
  ) => {
    const slugCategory = slugify(categoryName);
    const slugSubCategory = slugify(subCategoryName);
    router.push(`/categories/${slugCategory}/${slugSubCategory}`);
  };

  return (
    <div className="w-full px-4">
      {categories.map((category, index) =>
        category.subcategories && category.subcategories.length > 0 ? (
          <Accordion type="single" collapsible key={index} className="mb-2">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="capitalize">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="pl-4">
                  {category.subcategories.map((sub, subIndex) => (
                    <li key={subIndex} className="capitalize">
                      <DrawerClose asChild>
                        <button
                          onClick={() =>
                            handleSubCategoryClick(category.name, sub.name)
                          }
                          className="hover:text-primary py-1 capitalize hover:underline"
                        >
                          {sub.name}
                        </button>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div key={index} className="py-2">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className="text-foreground hover:text-primary hover:underline font-medium capitalize"
            >
              {category.name}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default SubCategories;
