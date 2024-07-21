import React from "react";
import Link from "next/link";

const socialLinks = [
  { href: "https://www.facebook.com", icon: "ri-facebook-line" },
  { href: "https://www.instagram.com", icon: "ri-instagram-line" },
  { href: "https://www.linkedin.com", icon: "ri-linkedin-line" },
  { href: "https://www.twitter.com", icon: "ri-twitter-x-line" },
];

const SocialIcon = ({ href, icon, className }: SocialIconProps) => (
  <li className="flex items-center gap-2">
    <a href={href} className={`text-white ${className}`}>
      <i className={icon}></i>
    </a>
  </li>
);

const SocialIcons = ({ faq, separator, className }: SocialIconsProps) => {
  return (
    <ul className={`flex items-center gap-4 ${separator ? "separator" : ""}`}>
      {faq && (
        <Link className="hover:text-red-200" href="/faq">
          FAQ
        </Link>
      )}
      {socialLinks.map((link, index) => (
        <React.Fragment key={index}>
          <SocialIcon className={className} href={link.href} icon={link.icon} />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default SocialIcons;
