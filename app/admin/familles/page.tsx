"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import FamilleList from "../components/FamilleList";
import { Famille } from "@/types";

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
  } = useQuery<Famille[], Error>({
    queryKey: ["familles"],
    queryFn: fetchFamilles,
  });

  if (error)
    return <p>Erreur lors du chargement des familles: {error.message}</p>;

  return (
    <main className="p-4">
      <FamilleList pending={isPending} data={familles || []} />
    </main>
  );
};

export default Familles;
