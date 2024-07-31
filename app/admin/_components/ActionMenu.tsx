"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Famille, Produit } from "@/types";

const ActionMenu = ({
  row,
  type,
}: {
  row: Row<Produit | Famille>;
  type: string;
}) => {
  const produit = row.original;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/${type}`, {
        method: "DELETE",
        body: JSON.stringify({ id: id.toString() }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      mutation.mutate(produit.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Modifier</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Supprimer</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Voir les détails du produit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
