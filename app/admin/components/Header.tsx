"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/SearchInput";
import { usePathname } from "next/navigation";

const menus = [
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
    name: "Services",
    href: "/admin/services",
  },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="p-4 flex w-full justify-between text-foreground items-center  border-b sticky top-0">
      <Link
        href="/admin"
        className="w-fit logo-container bg-primary border-primary"
      >
        <span className="logo-section-1">Mbaye &</span>
        <span className="p-1">Frères</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {menus.map((menu, i) => (
            <NavigationMenuItem key={i}>
              <Link
                href={menu.href}
                className={`hover:bg-accent cursor-pointer p-2 rounded-sm hover:text-accent-foreground ${
                  pathname === menu.href ? "bg-accent" : null
                }`}
              >
                {menu.name}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-1">
        <SearchInput className="border-accent" />
        <ProfileButton />
      </div>
    </header>
  );
};

export default Header;
