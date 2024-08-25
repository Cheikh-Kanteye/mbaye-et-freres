import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { produit as Produit } from "@prisma/client";
import { IFormInput } from "@/types";
import ImageUpload from "./ImageUpload";
import { useSpecifications } from "@/hooks/useSpecifications";
import ProductFormFields from "./ProductFormFields";
import AlertDialog from "./AlertDialog";

interface AddProduitFormProps {
  defaultValue?: Produit;
  isEdit?: boolean;
  closeOnSuccess?: () => void;
}

type pType = "accessoire" | "produit";

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
    formData.append("type", data.type);
    formData.append("specifications", JSON.stringify(data.specifications));

    data.images.forEach((image) => formData.append("images", image));

    mutation.mutate(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductFormFields
          register={register}
          control={control}
          handleFamilleChange={handleFamilleChange}
          selectedFamille={selectedFamille}
          specifications={specifications}
          specsList={specsList}
          handleSpecsChange={handleSpecsChange}
          addSpecification={addSpecification}
          removeSpec={removeSpec}
          errors={errors}
        />

        <ImageUpload
          control={control}
          images={images}
          defaultImage={defaultValue?.image_url}
          handleDrop={handleDrop}
        />

        <Button
          type="submit"
          className="flex items-center gap-2 w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending && <Loader size={16} color="white" />}
          {isEdit ? "Mettre à jour" : "Ajouter"}
        </Button>
      </form>

      <AlertDialog
        isDialogOpen={isDialogOpen}
        alertMessage={alertMessage}
        alertType={alertType}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default AddProduitForm;
