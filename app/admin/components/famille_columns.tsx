import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Famille, FamilleWCategorie } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const famille_columns: ColumnDef<FamilleWCategorie>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-gray-500 checked:border-primary"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-500 checked:border-primary"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => row.getValue("nom"),
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => (
      <p className="line-clamp-2">{row.getValue("description")}</p>
    ),
  },
  {
    accessorKey: "categories",
    header: "Catégories",
    cell: ({ row }) => {
      const categories = row.getValue(
        "categories"
      ) as FamilleWCategorie["categories"];
      return categories.nom;
    },
  },
  {
    accessorKey: "nbProduits",
    header: "produits",
    cell: ({ row }) => {
      const produits = row.original.produits;
      return produits ? produits.length : 0;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
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
            <DropdownMenuItem>Supprimer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir les details du produit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
