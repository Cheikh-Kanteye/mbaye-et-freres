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
import { useRouter } from "next/navigation";
import AddEntityBtn from "./AddEntityBtn";
import React from "react";

const ActionMenu = ({
  row,
  type,
  link,
  children,
}: {
  row: Row<Produit | Famille>;
  type: string;
  link?: string;
  children?: React.ReactNode;
}) => {
  const produit = row.original;
  const router = useRouter();

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
    if (
      confirm(
        `Voulez-vous vraiment supprimer ${
          type == "produits" ? "ce produit" : "cette " + type
        } ?`
      )
    ) {
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
        <AddEntityBtn
          label="Modifier"
          desc={`Modification ${type}`}
          variant={"ghost"}
          withIcon={false}
          className="w-full text-foreground"
          childClassName="justify-start p-1 h-[36px]"
        >
          {children}
        </AddEntityBtn>
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive hover:!text-destructive hover:!bg-destructive-foreground"
        >
          Supprimer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => link && router.push(link)}>
          Voir les détails du produit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
