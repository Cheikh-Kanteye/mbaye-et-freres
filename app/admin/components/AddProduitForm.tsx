import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DropInput from "./DropInput";
import SelectData from "./SelectData";
import Loader from "./Loader";
import ErrorDialog from "./ErrorDialog";

interface IFormInput {
  reference: string;
  description: string;
  specifications: string[];
  images: File[];
  idFamille: number;
}

const AddProduitForm = () => {
  const { register, handleSubmit, control, setValue, reset } =
    useForm<IFormInput>();
  const [specifications, setSpecifications] = useState("");
  const [specsList, setSpecsList] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [selectedFamille, setSelectedFamille] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleFamilleChange = (value: string | undefined) => {
    setSelectedFamille(value);
    setValue("idFamille", parseInt(value!, 10));
  };

  const handleSpecsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.includes(",")) {
      const newSpecs = value.split(",").map((spec) => spec.trim());
      setSpecsList((prev) => [...prev, ...newSpecs.filter((spec) => spec)]);
      setSpecifications("");
      setValue("specifications", [
        ...specsList,
        ...newSpecs.filter((spec) => spec),
      ]);
    } else {
      setSpecifications(value);
    }
  };

  const removeSpec = (index: number) => {
    const updatedSpecsList = specsList.filter((_, i) => i !== index);
    setSpecsList(updatedSpecsList);
    setValue("specifications", updatedSpecsList);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    setValue("images", [...images, ...acceptedFiles]);
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/produits", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setIsDialogOpen(true);
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("reference", data.reference);
    formData.append("idFamille", data.idFamille.toString());
    formData.append("type", "produit");

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await mutation.mutateAsync(formData);
      reset();
      setSpecifications("");
      setSpecsList([]);
      setImages([]);
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
    }
  };

  return (
    <>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Input
            id="reference"
            {...register("reference", { required: true })}
            placeholder="Référence (ex: 5102-AL)"
          />
        </div>
        <SelectData
          type="familles"
          placeholder="Sélectionner une famille"
          label="Famille"
          value={selectedFamille}
          onChange={handleFamilleChange}
        />
        <div className="flex flex-col gap-2">
          <Input
            id="specification"
            value={specifications}
            onChange={handleSpecsChange}
            placeholder="Spécifications (séparées par des virgules)"
          />
          <div className="flex flex-wrap gap-2">
            {specsList.map((spec, index) => (
              <Badge
                key={index}
                variant={"secondary"}
                className="flex items-center bg-primary-foreground text-primary p-1 rounded-sm"
              >
                {spec}
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => removeSpec(index)}
                >
                  &times;
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Description"
          />
        </div>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <DropInput
              reset={false}
              images={images}
              handleDrop={(acceptedFiles: File[]) => {
                handleDrop(acceptedFiles);
                field.onChange(acceptedFiles);
              }}
            />
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader /> : "Ajouter"}
          </Button>
        </DialogFooter>
      </form>
      <ErrorDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        errorMessage={errorMessage || "Une erreur est survenue"}
      />
    </>
  );
};

export default AddProduitForm;
