import { PrismaClient } from "@prisma/client";
import { IconType } from "react-icons";

declare type SocialIconProps = {
  href?: string;
  icon: string;
  className?: string;
};

declare type SocialIconsProps = {
  faq?: bool;
  separator?: bool;
  className?: string;
};

declare global {
  var prisma: PrismaClient | undefined;
}

export type ContactParams = {
  href: string;
  icon: IconType;
  text: string;
};

export type CategoryParams = {
  name: string;
  href: string;
  subcategories?: Category[];
};

export type InfoCardProps = {
  iconSrc: string;
  bgColor: string;
  title: string;
  description: string;
};

export interface Famille {
  id: number;
  nom: string;
  categories: {
    id: number;
    nom: string;
  };
  produits: Produit[];
}

export interface Categorie {
  id: number;
  nom: string;
  familles: Famille[];
}

export interface Image {
  id: number;
  url: string;
  produitId: number;
}

interface Produit {
  reference: string;
  description: string;
  specifications: string[];
  images: { id: int; url: string }[];
  familles: Famille;
}
