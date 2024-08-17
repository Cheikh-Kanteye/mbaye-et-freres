import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CategorieWFamille } from "@/types";
import CategorieActionMenu from "./CategorieActionMenu";

export const categorie_columns: ColumnDef<CategorieWFamille>[] = [
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
    accessorKey: "nbFamilles",
    header: "familles",
    cell: ({ row }) => {
      const familles = row.original.familles;

      return familles ? familles.length : 0;
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
    cell: ({ row }) => <CategorieActionMenu row={row} />,
  },
];
