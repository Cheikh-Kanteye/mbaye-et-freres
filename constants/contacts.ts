import { HiOutlineMail } from "react-icons/hi";
import { BiMap } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { TbClockHour4 } from "react-icons/tb";
import { ContactParams, InfoCardProps } from "@/types";

export const contacts: ContactParams[] = [
  {
    href: "/",
    icon: BiMap,
    text: "HLM I Av Cheikh Ahmadou Bamba",
  },
  {
    href: "mailto:contact@bmb.sn",
    icon: HiOutlineMail,
    text: "contact@bmb.sn",
  },
  {
    href: "tel:+1-800-456-478-23",
    icon: LuPhone,
    text: "+1-800-456-478-23",
  },
  {
    href: "/",
    icon: TbClockHour4,
    text: "Lundi 8:00 am – 18:00 pm",
  },
];

export const infoCards: InfoCardProps[] = [
  {
    iconSrc: "/icons/idea.png",
    bgColor: "bg-yellow-50",
    title: "Innovation",
    description:
      "Nos produits sont reconnus pour leur innovation et leur qualité exceptionnelle",
  },
  {
    iconSrc: "/icons/recommend.png",
    bgColor: "bg-pink-50",
    title: "Expertise",
    description: "Une équipe constituée d'experts reconnus dans leur domaine",
  },
  {
    iconSrc: "/icons/experience.png",
    bgColor: "bg-blue-50",
    title: "Satisfaction",
    description:
      "Une entreprise de qualité qui se démarque par son engagement envers ses clients",
  },
];
