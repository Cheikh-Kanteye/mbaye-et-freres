import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

import { FiPlus } from "react-icons/fi";

const AddEntityBtn = ({
  children,
  label,
  desc,
}: {
  children: React.ReactNode;
  label: string;
  desc: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className="flex border-primary text-primary items-center gap-0.5"
        asChild
      >
        <Button variant="outline">
          <FiPlus size={18} /> <p className="hidden sm:block">{label}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{desc}</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntityBtn;
