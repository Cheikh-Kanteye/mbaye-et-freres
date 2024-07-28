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
  onChange: (value: string | undefined) => void; // Fonction pour gérer la sélection
  value: string | undefined; // ID de la valeur sélectionnée
}

const SelectData = ({
  type,
  placeholder,
  label,
  onChange,
  value,
}: SelectDataProps) => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: [type],
    queryFn: () => fetchData(type),
  });

  // Trouver le nom correspondant à l'ID sélectionné
  const selectedItem = data
    ? data.find((item: { id: number }) => item.id === parseInt(value || ""))
    : null;
  const displayValue = selectedItem?.nom || placeholder;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
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
          ) : !data || !data.length ? (
            <SelectItem value="null" disabled>
              Aucune donnée à afficher
            </SelectItem>
          ) : (
            data.map((item: { id: string; nom: string }) => (
              <SelectItem key={item.id} value={item.id}>
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
