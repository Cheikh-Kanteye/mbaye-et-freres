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
