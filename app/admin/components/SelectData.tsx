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
}

const SelectData = ({ type, placeholder, label }: SelectDataProps) => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: [type],
    queryFn: () => fetchData(type),
  });

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder || "Sélectionner une option"} />
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
                recharger
              </Button>
            </SelectItem>
          ) : !data || !data.length ? (
            <SelectItem value="null" disabled>
              Aucune donnée à afficher
            </SelectItem>
          ) : (
            data.map((item: { id: string; nom: string }) => (
              <SelectItem key={item.id} value={item.nom}>
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
