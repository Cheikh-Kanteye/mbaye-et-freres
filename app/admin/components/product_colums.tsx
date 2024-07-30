import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Produit } from "@/types";
import ActionMenu from "./ActionMenu";

export const product_colums: ColumnDef<Produit>[] = [
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
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as { url: string }[];
      const firstImage =
        images && images.length > 0
          ? images[0].url
          : "/images/fallback-image.jpg"; // URL de l'image de secours
      return (
        <Image
          src={firstImage}
          alt="Image"
          width={50}
          height={50}
          className="w-10 h-10 rounded-sm object-cover"
        />
      );
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => row.getValue("reference"),
  },
  {
    accessorKey: "familles",
    header: "Familles",
    cell: ({ row }) => {
      const familles = row.getValue("familles") as Produit["familles"];
      return familles.nom;
    },
  },
  {
    accessorKey: "categories",
    header: "Catégories",
    cell: ({ row }) => {
      const famille = row.getValue("familles") as Produit["familles"];
      return famille.categories.nom;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => <ActionMenu row={row as never} type="produits"/>,
  },
];
