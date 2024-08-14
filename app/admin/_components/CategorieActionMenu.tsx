"use client";
import { CategorieWFamille } from "@/types";
import { Row } from "@tanstack/react-table";
import React from "react";
import ActionMenu from "./ActionMenu";
import AddCategorieForm from "./AddCategorieForm";

const CategorieActionMenu = ({ row }: { row: Row<CategorieWFamille> }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ActionMenu
      open={open}
      onOpenChange={() => setOpen(!open)}
      row={row as never}
      type="categories"
    >
      <AddCategorieForm
        closeOnSuccess={() => setOpen(false)}
        defaultValue={row.original}
        isEdit
      />
    </ActionMenu>
  );
};

export default CategorieActionMenu;
