"use client";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "@/components/SearchInput";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { usePathname } from "next/navigation";
import { RiMenu4Line, RiSearch2Line } from "react-icons/ri";
import React, { useState } from "react";

const menus = [
  {
    name: "Voir la boutique",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/admin/",
  },
  {
    name: "Produits",
    href: "/admin/produits",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Familles",
    href: "/admin/familles",
  },
  {
    name: "Services",
    href: "/admin/services",
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="w-full border-b sticky top-0 bg-background"
      style={{ zIndex: 10000 }}
    >
      <div className="flex p-4 w-full max-w-screen-xl mx-auto justify-between text-foreground items-center">
        <Link
          href="/admin"
          className="w-fit logo-container bg-primary border-primary"
        >
          <span className="logo-section-1">Mbaye &</span>
          <span className="p-1">Frères</span>
        </Link>
        <div className="hidden lg:flex gap-2 items-center">
          {menus.map((menu, i) => (
            <Link
              key={i}
              href={menu.href}
              className={`hover:bg-accent cursor-pointer p-2 rounded-sm hover:text-accent-foreground ${
                pathname === menu.href ? "bg-accent" : null
              }`}
            >
              {menu.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <SearchInput className="hidden w-fit lg:flex" />
          <div className="block lg:hidden">
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-center p-2 rounded-full focus:outline-none transition bg-primary-foreground">
                  <RiSearch2Line />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-screen" style={{ zIndex: 10001 }}>
                <SearchInput className="w-full shadow-primary mx-auto border border-primary-foreground" />
              </PopoverContent>
            </Popover>
          </div>
          <div className="block lg:hidden">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger className="bg-primary-foreground text-foreground p-2 aspect-square rounded-full">
                <RiMenu4Line />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-background p-3 rounded-sm shadow-xl mr-2 w-56"
                style={{ zIndex: 10000 }}
              >
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menus.map((menu, i) => (
                  <React.Fragment key={i}>
                    <DropdownMenuItem
                      className="p-1 bg-background hover:bg-slate-50"
                      asChild
                    >
                      <Link href={menu.href}>{menu.name}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ProfileButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
