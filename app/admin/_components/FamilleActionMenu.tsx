"use client";
import { Row } from "@tanstack/react-table";
import React from "react";
import ActionMenu from "./ActionMenu";
import AddFamilleForm from "./AddFamilleForm";
import { FamilleWCategorie } from "@/types";

const FamilleActionMenu = ({ row }: { row: Row<FamilleWCategorie> }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ActionMenu
      open={open}
      onOpenChange={() => setOpen(!open)}
      row={row as never}
      type="familles"
    >
      <AddFamilleForm
        closeOnSuccess={() => setOpen(false)}
        defaultValue={row.original}
        isEdit
      />
    </ActionMenu>
  );
};

export default FamilleActionMenu;
