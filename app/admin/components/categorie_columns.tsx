import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Categorie } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const categorie_columns: ColumnDef<Categorie>[] = [
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
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "nbFamilles",
    header: "nombre de familles",
    cell: ({ row }) => {
      const familles = row.original.familles;
      return familles ? familles.length : 0;
    },
  },
  {
    accessorKey: "nbProduits",
    header: "nombre de produits",
    cell: ({ row }) => {
      const familles = row.original.familles;
      const nombreProduits = familles
        ? familles.reduce(
            (total, famille) =>
              total + (famille.produits ? famille.produits.length : 0),
            0
          )
        : 0;
      return nombreProduits;
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
