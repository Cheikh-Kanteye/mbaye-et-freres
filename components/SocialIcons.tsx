import React from "react";
import Link from "next/link";
import { SocialIconsProps } from "@/types";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { ImFacebook } from "react-icons/im";
const socialLinks = [
  { href: "https://www.facebook.com", icon: ImFacebook },
  { href: "https://www.instagram.com", icon: FiInstagram },
  { href: "https://www.linkedin.com", icon: FaXTwitter },
  { href: "https://www.twitter.com", icon: FaLinkedinIn },
];

const SocialIcons = ({ faq, separator, className }: SocialIconsProps) => {
  return (
    <ul className={`flex items-center gap-4 ${separator ? "separator" : ""}`}>
      {faq && (
        <Link className="hover:text-red-200" href="/faq">
          FAQ
        </Link>
      )}
      {socialLinks.map(({ href, icon: Icon }, index) => (
        <React.Fragment key={index}>
          <Link className="icon-link" href={href}>
            <Icon
              style={{
                height: "1.4cap",
                width: "auto",
              }}
            />
          </Link>{" "}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default SocialIcons;
