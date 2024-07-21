import React from "react";
import { categories } from "@/constants/categories";
import { slugify } from "@/utils/slugify"; // Assurez-vous que slugify est bien importé
import CategoryCard from "@/components/CategoryCard";
import { Badge } from "@/components/ui/badge";
import CommandCard from "@/components/CommandCard";

// Créer un objet pour un accès rapide aux catégories
const categoryMap = categories.reduce((acc, cat) => {
  acc[slugify(cat.name)] = cat;
  return acc;
}, {} as Record<string, (typeof categories)[0]>);

interface Params {
  params: {
    category: string;
    subcategory?: string;
  };
}

const CategoryPage = ({ params }: Params) => {
  const { category, subcategory } = params;

  // Trouver la catégorie et la sous-catégorie correspondantes
  const selectedCategory = categoryMap[category];
  const selectedSubcategory = selectedCategory?.subcategories?.find(
    (sub) => slugify(sub.name) === subcategory
  );

  if (!selectedCategory) {
    return <div>Catégorie non trouvée</div>;
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-screen-lg mx-auto py-6">
        <div className="flex gap-2 items-center justify-center">
          <CategoryCard
            categoryName={selectedCategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
          />
          <CategoryCard
            categoryName={selectedCategory.name}
          />
        </div>
        <div className="flex mt-4 gap-4 items-center">
          <div>
            <div className="flex flex-col gap-2">
              <h2 className="capitalize font-semibold text-2xl">
                {selectedCategory.name}
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

          <div className="flex-1/3">
            <CommandCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
