"use client";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { categories } from "@prisma/client";

const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des catégories");
  }
  return response.json();
};

interface CategoryListProps {
  onChange: (id: number | null) => void;
  activeCategory: number | null; // Ajouter la prop pour la catégorie active
}

const CategoryList = ({ onChange, activeCategory }: CategoryListProps) => {
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery<categories[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isError) {
    return <div>Erreur lors de la récupération des catégories</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="max-w-screen-md mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl font-['rubik'] mb-4">
          Découvrez notre vaste gamme de catégories
        </h1>
        <p className="text-bs text-slate-500 mb-6">
          Explorez notre sélection diversifiée de catégories et trouvez
          exactement ce dont vous avez besoin pour vos projets. Que vous
          cherchiez des matériaux spécifiques ou des solutions innovantes, nous
          avons tout ce qu&apos;il vous faut !
        </p>
      </div>
      {!isPending && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <Button
            variant={"outline"}
            onClick={() => onChange(null)}
            className={`hover:text-primary hover:border-primary hover:bg-transparent rounded-full ${
              activeCategory === null ? "border-primary text-primary" : ""
            }`} // Actif
          >
            <span className="text-sm capitalize">Tout</span>
          </Button>
          {categories &&
            categories.map((category, i) => (
              <Button
                variant={"outline"}
                onClick={() => onChange(category.id)}
                className={`hover:text-primary hover:border-primary hover:bg-transparent rounded-full ${
                  activeCategory === category.id
                    ? "border-primary text-primary"
                    : ""
                }`} // Actif
                key={i}
              >
                <span className="text-sm  capitalize">{category.nom}</span>
              </Button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
