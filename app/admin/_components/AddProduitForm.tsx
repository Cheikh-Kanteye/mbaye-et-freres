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
import AlertMessage from "./AlertMessage";
import Loader from "@/components/Loader";
import { useSpecifications } from "@/hooks/useSpecifications";

interface IFormInput {
  reference: string;
  description?: string;
  specifications: string[];
  images: File[];
  idFamille: number;
}

const AddProduitForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [images, setImages] = useState<File[]>([]);
  const [selectedFamille, setSelectedFamille] = useState<string | undefined>();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    specifications,
    specsList,
    handleSpecsChange,
    addSpecification,
    removeSpec,
    resetSpecifications,
  } = useSpecifications(setValue);

  const handleFamilleChange = (value: string | undefined) => {
    setSelectedFamille(value);
    setValue("idFamille", parseInt(value || "0", 10), { shouldValidate: true });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
    setValue("images", [...images, ...acceptedFiles], { shouldValidate: true });
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
      setAlertType("success");
      setAlertMessage("Produit créé avec succès");
      setIsDialogOpen(true);
      reset();
      resetSpecifications(); // Reset specifications here
      setImages([]);
    },
    onError: (error: Error) => {
      setAlertType("error");
      setAlertMessage(error.message);
      setIsDialogOpen(true);
    },
  });

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append("description", data.description || "");
    formData.append("reference", data.reference);
    formData.append("idFamille", data.idFamille.toString());
    formData.append("type", "produit");

    // Ajouter les spécifications comme un JSON stringifié
    formData.append("specifications", JSON.stringify(data.specifications));

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await mutation.mutateAsync(formData);
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
            {...register("reference", { required: "La référence est requise" })}
            placeholder="Référence (ex: 5102-AL)"
          />
          {errors.reference && (
            <p className="text-red-500 text-sm">{errors.reference.message}</p>
          )}
        </div>
        <SelectData
          type="familles"
          placeholder="Sélectionner une famille"
          label="Famille"
          value={selectedFamille}
          onChange={handleFamilleChange}
        />
        {errors.idFamille && (
          <p className="text-red-500 text-sm">La famille est requise</p>
        )}
        <div className="flex flex-col gap-2">
          <Input
            id="specification"
            value={specifications}
            onChange={handleSpecsChange}
            placeholder="Spécifications (séparées par des virgules)"
            onBlur={addSpecification} // Trigger add on blur
          />
          {errors.specifications && (
            <p className="text-red-500 text-sm">
              Les spécifications sont requises
            </p>
          )}
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
          rules={{ required: "Au moins une image est requise" }}
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
        {errors.images && (
          <p className="text-red-500 text-sm">{errors.images.message}</p>
        )}
        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader /> : "Ajouter"}
          </Button>
        </DialogFooter>
      </form>
      <AlertMessage
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message={alertMessage || "Une erreur est survenue"}
        type={alertType}
      />
    </>
  );
};

export default AddProduitForm;
