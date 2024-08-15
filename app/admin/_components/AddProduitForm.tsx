import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DropInput from "./DropInput";
import SelectData from "./SelectData";
import Loader from "@/components/Loader";
import { useSpecifications } from "@/hooks/useSpecifications";
import { produit as Produit } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { IFormInput } from "@/types";
import InputField from "./InputField";
import AlertMessage from "./AlertMessage";
import SpecificationSection from "./SpecificationSection";

interface AddProduitFormProps {
  defaultValue?: Produit;
  isEdit?: boolean;
  closeOnSuccess?: () => void;
}

type pType = "produit" | "accessoire";

const AddProduitForm: React.FC<AddProduitFormProps> = ({
  defaultValue,
  isEdit,
  closeOnSuccess,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      description: defaultValue?.description || "",
      reference: defaultValue?.reference || "",
      idFamille: defaultValue?.idFamille || 0,
      type: (defaultValue?.type as pType) || "produit",
      specifications: defaultValue?.specifications || [],
      images: [],
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [selectedFamille, setSelectedFamille] = useState<string | undefined>(
    defaultValue?.idFamille.toString()
  );
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
      const url = isEdit
        ? `/api/produits/${defaultValue?.id}`
        : "/api/produits";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
      setAlertType("success");
      setAlertMessage(
        isEdit ? "Produit mis à jour avec succès" : "Produit créé avec succès"
      );
      setIsDialogOpen(true);
      reset();
      resetSpecifications();
      setImages([]);
      if (closeOnSuccess) closeOnSuccess();
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
    formData.append("type", data.type); // Inclure le type ici
    formData.append("specifications", JSON.stringify(data.specifications));
    data.images.forEach((image) => formData.append("images", image));

    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du produit :", error);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      // Mise à jour des valeurs du formulaire
      setValue("description", defaultValue.description as string);
      setValue("reference", defaultValue.reference);
      setValue("idFamille", defaultValue.idFamille);
      setValue("type", defaultValue.type as pType);
      setValue("specifications", defaultValue.specifications);
    }
  }, [
    defaultValue,
    resetSpecifications,
    setValue,
    addSpecification,
    specsList,
  ]);

  return (
    <>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8 items-center">
          <Label>Type</Label>
          <Controller
            control={control}
            name="type"
            rules={{ required: "Le type est requis" }}
            render={({ field }) => (
              <RadioGroup {...field} className="flex gap-8 items-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="produit" id="r1" />
                  <Label htmlFor="r1">Produit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accessoire" id="r2" />
                  <Label htmlFor="r2">Accessoire</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <InputField
          id="reference"
          label="Référence"
          placeholder="Référence (ex: 5102-AL)"
          register={register("reference", {
            required: "La référence est requise",
          })}
          error={errors.reference?.message}
        />

        <SelectData
          type="familles"
          placeholder="Sélectionner une famille"
          label="Famille"
          value={selectedFamille}
          onChange={handleFamilleChange}
        />
        {errors.idFamille && (
          <p className="text-red-500">{errors.idFamille.message}</p>
        )}

        <SpecificationSection
          specifications={specifications}
          specsList={specsList || defaultValue?.specifications}
          handleSpecsChange={handleSpecsChange}
          addSpecification={addSpecification}
          removeSpec={removeSpec}
          error={errors.specifications?.message}
        />

        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <Controller
          control={control}
          name="images"
          rules={{ required: "Au moins une image est requise" }}
          render={({ field }) => (
            <>
              <DropInput
                reset={false}
                images={images}
                handleDrop={(acceptedFiles: File[]) => {
                  handleDrop(acceptedFiles);
                  field.onChange(acceptedFiles);
                }}
              />
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader /> : isEdit ? "Modifier" : "Ajouter"}
          </Button>
        </DialogFooter>
      </form>

      {isDialogOpen && (
        <AlertMessage
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          message={alertMessage || "Une erreur est survenue"}
          type={alertType}
        />
      )}
    </>
  );
};

export default AddProduitForm;
