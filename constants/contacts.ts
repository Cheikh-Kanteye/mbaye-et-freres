import { HiOutlineMail } from "react-icons/hi";
import { BiMap } from "react-icons/bi";
import { LuPhone } from "react-icons/lu";
import { TbClockHour4 } from "react-icons/tb";
import { ContactParams } from "@/types";

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
