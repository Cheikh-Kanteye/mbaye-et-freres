"use client";

import React from "react";
import { categories } from "@/constants/categories";
import CategoryCard from "@/components/CategoryCard";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CommandCard from "@/components/CommandCard";

interface Params {
  params: {
    category: string;
    subcategory: string;
  };
}

const CategorySubcategoryPage = ({ params }: Params) => {
  const { category, subcategory } = params;

  // Trouver la catégorie correspondant au paramètre
  const selectedCategory = categories.find(
    (cat) => slugify(cat.name) === category
  );

  if (!selectedCategory) {
    return <div>Category not found</div>;
  }

  // Trouver la sous-catégorie
  const selectedSubcategory = selectedCategory.subcategories?.find(
    (sub) => slugify(sub.name) === subcategory
  );

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-lg mx-auto py-6">
        <div className="flex gap-2 items-center justify-center flex-wrap lg:flex-nowrap">
          <CategoryCard
            categoryName={selectedCategory.name}
            subCategoryName={selectedSubcategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
            subCategoryName={selectedSubcategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
            subCategoryName={selectedSubcategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
            subCategoryName={selectedSubcategory.name}
          />
        </div>
        <div className="flex flex-col lg:flex-row mt-4 gap-4 px-6 md:px-4 lg:px-0 items-center">
          <div>
            <div className="flex flex-col gap-2">
              <p className="capitalize">{selectedCategory.name}</p>
              <h2 className="capitalize font-semibold text-2xl">
                {selectedSubcategory.name}
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                eos minima dolor voluptatem magnam animi.
              </p>
              <div className="flex gap-3">
                <Badge variant={"secondary"}>Propriete 1</Badge>
                <Badge variant={"secondary"}>Propriete 2</Badge>
                <Badge variant={"secondary"}>Propriete 3</Badge>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-700">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
              ullam aspernatur adipisci, suscipit perspiciatis expedita animi
              quia nesciunt placeat fugiat voluptates, dignissimos laboriosam
              unde. Earum quia, eius suscipit dicta deleniti exercitationem qui
              nesciunt dolor asperiores facere atque ut saepe nihil recusandae
              dignissimos quidem, omnis sit pariatur voluptatem beatae!
              Deserunt, quia.
            </p>
          </div>

          <div className="w-full md:flex-1/3">
            <CommandCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategorySubcategoryPage;
