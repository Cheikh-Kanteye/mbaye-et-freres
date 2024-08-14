import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectData from "./SelectData";
import AlertMessage from "./AlertMessage";
import { FamilleWCategorie } from "@/types";

interface IFormInput {
  nom: string;
  description: string;
  idCategorie?: number; // Rendre idCategorie optionnel
}

const fetcher = async (
  method: "POST" | "PUT",
  url: string,
  data: IFormInput | FamilleWCategorie
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Erreur lors de l'opération ${method}`);
  }

  return response.json();
};

const AddFamilleForm = ({
  defaultValue,
  isEdit,
  closeOnSuccess,
}: {
  isEdit?: boolean;
  defaultValue?: FamilleWCategorie;
  closeOnSuccess?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      nom: defaultValue?.nom || "",
      description: defaultValue?.description || "",
      idCategorie: defaultValue?.idCategorie, // Utiliser la valeur par défaut si elle existe
    },
  });

  const [selectedCategorie, setSelectedCategorie] = React.useState<
    string | undefined
  >(defaultValue?.idCategorie?.toString());
  const [alert, setAlert] = React.useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: IFormInput | FamilleWCategorie) => {
      const url = isEdit
        ? `/api/familles/${(data as FamilleWCategorie).id}`
        : "/api/familles";
      const method = isEdit ? "PUT" : "POST";

      return fetcher(method, url, data);
    },
    onSuccess: () => {
      setAlert({
        type: "success",
        message: isEdit
          ? "Famille modifiée avec succès !"
          : "Famille ajoutée avec succès !",
      });
      setIsDialogOpen(true);
      queryClient.invalidateQueries({ queryKey: ["familles"] });
      reset();
    },
    onError: (error: Error) => {
      setAlert({ type: "error", message: error.message });
      setIsDialogOpen(true);
    },
  });

  const handleCategoryChange = (value: string | undefined) => {
    if (value) {
      setSelectedCategorie(value);
      setValue("idCategorie", parseInt(value, 10));
    }
  };

  const onSubmit = (data: IFormInput) => {
    // Assurez-vous que `idCategorie` est défini avant de soumettre les données
    if (isEdit && !data.idCategorie && defaultValue?.idCategorie) {
      data.idCategorie = defaultValue.idCategorie;
    }

    mutation.mutate(isEdit ? { ...data, id: defaultValue?.id } : data);
  };

  React.useEffect(() => {
    if (isEdit && defaultValue) {
      setValue("nom", defaultValue.nom);
      setValue("description", defaultValue.description as string);
      setSelectedCategorie(defaultValue.idCategorie?.toString());
    }
  }, [isEdit, defaultValue, setValue]);

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Input
          id="nom"
          {...register("nom", { required: true })}
          placeholder="Nom de la famille"
        />
        {errors.nom && <span>Le nom est requis.</span>}
      </div>
      <SelectData
        type="categories"
        placeholder="Sélectionner une catégorie"
        label="Catégorie"
        onChange={handleCategoryChange}
        value={selectedCategorie}
        defaultValue={defaultValue?.idCategorie?.toString()}
        showAll={false}
      />
      <div className="flex flex-col gap-2">
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && <span>La description est requise.</span>}
      </div>
      <DialogFooter>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Traitement..."
            : isEdit
            ? "Modifier"
            : "Ajouter"}
        </Button>
      </DialogFooter>
      {alert && (
        <AlertMessage
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            closeOnSuccess && closeOnSuccess();
          }}
          message={alert.message}
          type={alert.type}
        />
      )}
    </form>
  );
};

export default AddFamilleForm;
