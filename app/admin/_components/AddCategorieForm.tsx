import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IFormInput {
  nom: string;
  description: string;
}

const addCategorie = async (data: IFormInput) => {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la catégorie");
  }

  return response.json();
};

const AddCategorieForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addCategorie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

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
          placeholder="Nom de la catégorie"
        />
      </div>
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
        <p className="text-green-500">Catégorie ajoutée avec succès !</p>
      )}
    </form>
  );
};

export default AddCategorieForm;
