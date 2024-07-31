import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Produit } from "@/types";
import ActionMenu from "./ActionMenu";
import { produit } from "@prisma/client";

export const product_colums: ColumnDef<produit>[] = [
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
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url") as string;
      return (
        <div className="w-[50px] aspect-square grid place-content-center bg-accent overflow-hidden rounded-sm">
          <Image
            src={image_url || "/images/fallback-img"}
            alt="Image"
            width={50}
            height={50}
            className="w-10 h-10 rounded-sm object-contain"
          />
        </div>
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
    cell: ({ row }) => <ActionMenu row={row as never} type="produits" />,
  },
];
