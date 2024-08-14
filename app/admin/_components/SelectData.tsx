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
import { cn } from "@/lib/utils";
import { Categorie, Famille } from "@/types";

const fetchData = async (type: string) => {
  const res = await fetch(`/api/${type}`);
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération des ${type}`);
  }

  return res.json();
};

interface SelectDataProps {
  type: "categories" | "familles";
  placeholder?: string;
  label?: string;
  className?: string;
  onChange: (value: string | undefined) => void; // Fonction pour gérer la sélection
  value: string | undefined; // ID de la valeur sélectionnée
  showAll?: boolean;
  defaultValue?: string; // Ajout de la prop defaultValue
}

const SelectData = ({
  type,
  placeholder,
  label,
  value,
  className,
  showAll = true,
  onChange,
  defaultValue,
}: SelectDataProps) => {
  const { data, error, isPending, refetch } = useQuery<Categorie[] | Famille[]>(
    {
      queryKey: [type],
      queryFn: () => fetchData(type),
    }
  );

  if (!data) return null;

  const options = Array.isArray(data)
    ? showAll
      ? [{ id: -1, nom: "Tout" }, ...data]
      : data
    : [];

  // Trouver l'élément sélectionné en fonction de value ou defaultValue
  const selectedItem = options.find((item) =>
    value ? item.id.toString() === value : item.id.toString() === defaultValue
  );

  const displayValue = selectedItem?.nom || placeholder;

  return (
    <Select
      value={value || defaultValue} // Utiliser value ou defaultValue pour le composant Select
      onValueChange={(newValue) => {
        onChange(newValue === "-1" ? undefined : newValue);
      }}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder || "Sélectionner une option"}>
          {displayValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label || "Options"}</SelectLabel>
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
                Recharger
              </Button>
            </SelectItem>
          ) : !options || !options.length ? (
            <SelectItem value="null" disabled>
              Aucune donnée à afficher
            </SelectItem>
          ) : (
            options.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.nom}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectData;
