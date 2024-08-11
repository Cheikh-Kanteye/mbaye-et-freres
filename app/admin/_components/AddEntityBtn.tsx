import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

import { FiPlus } from "react-icons/fi";

type Props = {
  children: React.ReactNode;
  label: string;
  desc: string;
  withIcon?: boolean;
  className?: string;
  childClassName?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

const AddEntityBtn = ({
  children,
  label,
  desc,
  variant,
  withIcon = true,
  className,
  childClassName,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex border-primary text-primary items-center gap-0.5",
          className
        )}
        asChild
      >
        <Button variant={variant || "outline"} className={childClassName}>
          {withIcon && <FiPlus size={18} />}
          <p className="hidden sm:block">{label}</p>
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
