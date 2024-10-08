"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import FamilleList from "../_components/FamilleList";
import { Famille, FamilleWCategorie } from "@/types";

const fetchFamilles = async () => {
  const res = await fetch("/api/familles");
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

const Familles = () => {
  const {
    data: familles,
    error,
    isPending,
  } = useQuery<FamilleWCategorie[], Error>({
    queryKey: ["familles"],
    queryFn: fetchFamilles,
  });

  return (
    <section className="p-4">
      <FamilleList pending={isPending} data={familles || []} />
      {error && (
        <p className="text-sm text-destructive text-center">
          Erreur lors du chargement des produits: {error.message}
        </p>
      )}
    </section>
  );
};

export default Familles;
