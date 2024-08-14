"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import AlertMessage from "./AlertMessage";
import { service } from "@prisma/client";

interface IFormInput {
  nom: string;
  description: string;
}

const apiEndpoints = {
  create: "/api/services",
  update: (id: number) => `/api/services/${id}`,
};

const fetcher = async (url: string, method: string, data?: IFormInput) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la ${
        method === "POST" ? "création" : "modification"
      } du service`
    );
  }

  return response.json();
};

const AddServiceForm = ({
  defaultValue,
  isEdit = false,
  closeOnSuccess,
}: {
  isEdit?: boolean;
  defaultValue?: service;
  closeOnSuccess?: () => void;
}) => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>({
    defaultValues: {
      nom: defaultValue?.nom || "",
      description: defaultValue?.description || "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { id?: number; input: IFormInput }) =>
      fetcher(
        data.id ? apiEndpoints.update(data.id) : apiEndpoints.create,
        data.id ? "PUT" : "POST",
        data.input
      ),
    onSuccess: () => {
      setAlert({
        type: "success",
        message: isEdit
          ? "Service modifié avec succès !"
          : "Service ajouté avec succès !",
      });
      setIsDialogOpen(true);
      queryClient.invalidateQueries({ queryKey: ["services"] });

      if (isEdit && defaultValue) {
        setValue("nom", defaultValue.nom);
        setValue("description", defaultValue.description as string);
      }
    },
    onError: (error: Error) => {
      setAlert({ type: "error", message: error.message });
      setIsDialogOpen(true);
    },
  });

  const onSubmit = (data: IFormInput) => {
    mutation.mutate({
      id: isEdit && defaultValue ? defaultValue.id : undefined,
      input: data,
    });
    reset();
  };

  useEffect(() => {
    if (isEdit && defaultValue) {
      setValue("nom", defaultValue.nom);
      setValue("description", defaultValue.description as string);
    }
  }, [isEdit, defaultValue, setValue]);

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
        <Button type="submit" disabled={mutation.isPending} className="w-28">
          {mutation.isPending ? (
            <Loader size={18} color="white" />
          ) : isEdit ? (
            "Modifier"
          ) : (
            "Ajouter"
          )}
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

export default AddServiceForm;
