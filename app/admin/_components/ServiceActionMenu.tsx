"use client";
import { Row } from "@tanstack/react-table";
import React from "react";
import ActionMenu from "./ActionMenu";
import { service } from "@prisma/client";
import AddServiceForm from "./AddServiceForm";

const ServiceActionMenu = ({ row }: { row: Row<service> }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <ActionMenu
      open={open}
      onOpenChange={() => setOpen(!open)}
      row={row as never}
      type="services"
    >
      <AddServiceForm
        closeOnSuccess={() => setOpen(false)}
        defaultValue={row.original}
        isEdit
      />
    </ActionMenu>
  );
};

export default ServiceActionMenu;
