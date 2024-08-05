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

const addService = async (data: IFormInput) => {
  const response = await fetch("/api/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la service");
  }

  return response.json();
};

const AddServiceForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
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
          placeholder="Nom du service"
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
        <p className="text-green-500">Service ajouté avec succès !</p>
      )}
    </form>
  );
};

export default AddServiceForm;
