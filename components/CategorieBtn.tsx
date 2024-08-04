"use client";
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
import { RiBox3Line, RiMenuFill } from "react-icons/ri";
import { useState } from "react";
import { Button } from "./ui/button";

const CategorieBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="flex px-0 items-center gap-1 text-lg text-foreground hover:bg-transparent hover:text-primary"
          onClick={() => setOpen(true)}
          variant={"ghost"}
        >
          <RiBox3Line size={22} /> Tous les categories
        </Button>
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
