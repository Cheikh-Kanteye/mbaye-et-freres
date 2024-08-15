"use client";
import { useQuery } from "@tanstack/react-query";
import { CategorieWFamille } from "@/types";
import CategorieList from "../_components/CategorieList";

const fetchCategories = async () => {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

const Categories = () => {
  const {
    data: categories,
    error,
    isPending,
  } = useQuery<CategorieWFamille[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <section className="p-4">
      <CategorieList pending={isPending} data={categories || []} />
      {error && (
        <p className="text-sm text-destructive text-center">
          Erreur lors du chargement des produits: {error.message}
        </p>
      )}
    </section>
  );
};

export default Categories;
