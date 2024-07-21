import CategorieBtn from "./CategorieBtn";
import { RiMenuFill } from "react-icons/ri";
import NavLink from "./NavLink";
import { categories } from "@/constants/categories";
import { CategoryParams } from "@/types";

// Limiter les catégories affichées
const nav_categories: CategoryParams[] = [
  ...categories.slice(0, 5),
  { name: "À Propos de Nous", href: "/apropos" },
  { name: "Réalisations", href: "/realisations" },
];

const ProductBar = () => {
  return (
    <div className="container gap-3 py-2">
      <CategorieBtn>
        <span className="flex text-foreground items-center gap-1 px-1">
          <RiMenuFill /> Tous les categories
        </span>
      </CategorieBtn>
      <nav className="hidden md:flex gap-2">
        {nav_categories.map((category, index) => (
          <NavLink
            key={index}
            title={category.name}
            href={category.href}
            items={
              category?.subcategories?.map((sub) => ({
                name: sub.name,
                href: sub.href,
              })) || []
            }
          />
        ))}
      </nav>
    </div>
  );
};

export default ProductBar;
