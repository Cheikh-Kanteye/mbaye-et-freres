import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SubCategories from "./SubCategories";
import IconButton from "./IconButton";

const CategorieBtn = ({ children }: React.PropsWithChildren) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button className="p-0" variant="ghost">
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[300px] rounded-none overflow-y-auto">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Tous les categories</DrawerTitle>
          <DrawerClose asChild>
            <IconButton
              icon={AiOutlineClose}
              className="bg-primary-foreground"
            />
          </DrawerClose>
        </DrawerHeader>
        <SubCategories />
      </DrawerContent>
    </Drawer>
  );
};

export default CategorieBtn;
