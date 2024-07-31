import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SubCategories from "./SubCategories";
import IconButton from "./IconButton";
import { ScrollArea } from "./ui/scroll-area";

const CategorieBtn = ({ children }: React.PropsWithChildren) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="cursor-pointer" asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent
        style={{ zIndex: 100002 }}
        className="h-full w-[300px] rounded-none"
      >
        <ScrollArea className="h-screen">
          <DrawerHeader className="flex justify-between items-center">
            <div className="flex flex-col items-start">
              <DrawerTitle>Categories</DrawerTitle>
              <DrawerDescription className="text-left">
                Parcourer nos differents categories
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <IconButton
                icon={AiOutlineClose}
                className="bg-primary-foreground"
              />
            </DrawerClose>
          </DrawerHeader>
          <SubCategories />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default CategorieBtn;
