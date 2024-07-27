import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

// Fonction pour récupérer les catégories
const fetchCategories = async () => {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des catégories");
  }
  return res.json();
};

const SelectCategory = () => {
  const {
    data: categories,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionner une catégorie" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Catégorie</SelectLabel>
          {isPending ? (
            <SelectItem value="null" disabled>
              Chargement...
            </SelectItem>
          ) : error ? (
            <SelectItem value="null" disabled>
              Erreur de chargement{" "}
              <Button
                onClick={() => refetch()}
                variant={"ghost"}
                className="underline"
              >
                recharger
              </Button>
            </SelectItem>
          ) : !categories && !categories.length ? (
            <SelectItem value="null" disabled>
              Aucune categorie a afficher
            </SelectItem>
          ) : (
            categories.map((category: { id: string; nom: string }) => (
              <SelectItem key={category.id} value={category.nom}>
                {category.nom}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
