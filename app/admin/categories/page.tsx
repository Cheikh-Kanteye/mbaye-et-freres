"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Categorie, CategorieWFamille } from "@/types";
import CategorieList from "../components/CategorieList";

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

  if (error)
    return <p>Erreur lors du chargement des categories: {error.message}</p>;

  return (
    <main className="p-4">
      <CategorieList pending={isPending} data={categories || []} />
    </main>
  );
};

export default Categories;
