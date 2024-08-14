"use client";
import { Row } from "@tanstack/react-table";
import React from "react";
import ActionMenu from "./ActionMenu";
import AddProduitForm from "./AddProduitForm";
import { produit } from "@prisma/client";

const ProductActionMenu = ({ row }: { row: Row<produit> }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ActionMenu
      open={open}
      onOpenChange={() => setOpen(!open)}
      row={row as never}
      type="produits"
    >
      <AddProduitForm
        closeOnSuccess={() => setOpen(false)}
        defaultValue={row.original}
        isEdit
      />
    </ActionMenu>
  );
};

export default ProductActionMenu;
