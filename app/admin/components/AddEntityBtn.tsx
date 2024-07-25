import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

import { FiPlus } from "react-icons/fi";

const AddEntityBtn = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger
        className="flex border-primary text-primary items-center gap-0.5"
        asChild
      >
        <Button variant="outline">
          <FiPlus size={18} /> Ajouter produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
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
