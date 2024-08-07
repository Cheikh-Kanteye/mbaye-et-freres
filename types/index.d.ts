import { PrismaClient } from "@prisma/client";
import { IconType } from "react-icons";

declare type SocialIconProps = {
  href?: string;
  icon: string;
  className?: string;
};

export type SocialIconsProps = {
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
  iconSrc?: string;
  bgColor: string;
  title: string;
  description: string;
};

export type Categorie = {
  id: number;
  nom: string;
  description: string | null;
};

export type Famille = {
  id: number;
  nom: string;
  description: string | null;
  idCategorie: number;
  idGuide: number | null;
  guideUrl: string | null;
  produits?: Produit[];
};

interface CategorieWFamille extends Categorie {
  familles: Famille[];
}

interface FamilleWCategorie extends Famille {
  categories: Categorie;
}

export { CategorieWFamille, FamilleWCategorie };

export type Image = {
  id: number;
  url: string;
  idProduit: number;
};

export type Produit = {
  id: number;
  description: string | null;
  reference: string;
  idFamille: number;
  type: string;
  specifications: string[];
  image_url: string;
  public_id: string;
  _count: {
    familles: number;
    images: number;
  };
  familles: FamilleWCategorie;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};
