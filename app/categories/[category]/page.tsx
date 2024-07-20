import React from "react";
import { categories } from "@/constants/categories";
import { slugify } from "@/utils/slugify"; // Assurez-vous que slugify est bien importé

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
    <div>
      <h1>{selectedCategory.name}</h1>
      {selectedSubcategory ? (
        <div>
          <h2>Sous-catégorie</h2>
          <p>{selectedSubcategory.name}</p>
        </div>
      ) : (
        <div>
          <h2>Sous-catégories</h2>
          <ul>
            {selectedCategory.subcategories?.map((sub, index) => (
              <li key={index}>{sub.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
