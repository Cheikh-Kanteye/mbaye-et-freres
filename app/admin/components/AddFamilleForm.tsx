import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectData from "./SelectData";

interface IFormInput {
  nom: string;
  description: string;
  idCategorie: number; // Utiliser l'ID de la catégorie
}

const addFamille = async (data: IFormInput) => {
  const response = await fetch("/api/familles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la famille");
  }

  return response.json();
};

const AddFamilleForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const [selectedCategorie, setSelectedCategorie] = React.useState<string>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addFamille,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["familles"] });
    },
  });

  const handleCategoryChange = (value: string | undefined) => {
    setSelectedCategorie(value);
    setValue("idCategorie", parseInt(value!));
    console.log(selectedCategorie);
  };

  const onSubmit = (data: IFormInput) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Input
          id="nom"
          {...register("nom", { required: true })}
          placeholder="Nom de la famille"
        />
      </div>
      <SelectData
        type="categories" // Sélectionner les catégories
        placeholder="Sélectionner une catégorie"
        label="Catégorie"
        onChange={handleCategoryChange}
        value={selectedCategorie}
      />
      <div className="flex flex-col gap-2">
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description"
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Ajout..." : "Ajouter"}
        </Button>
      </DialogFooter>
      {mutation.isError && (
        <p className="text-red-500">Erreur lors de l&apos;ajout.</p>
      )}
      {mutation.isSuccess && (
        <p className="text-green-500">Famille produit ajoutée avec succès !</p>
      )}
    </form>
  );
};

export default AddFamilleForm;
