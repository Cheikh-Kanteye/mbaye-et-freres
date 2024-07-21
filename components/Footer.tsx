import Link from "next/link";
import SocialIcons from "./SocialIcons";
import { contacts } from "@/constants/contacts";

const Footer = () => {
  return (
    <footer className="bg-primary-foreground">
      <div className="footer px-3">
        <div className="flex flex-col sm:gap-4">
          <Link href="/" className="logo-secondary">
            <span className="logo-section-1">Mbaye &</span>
            <span className="p-1">Frères</span>
          </Link>

          <p className="text-justify text-sm font-light text-slate-800">
            Nous sommes convaincus que notre expertise et notre engagement
            envers la qualité et la durabilité font de nous le partenaire idéal
            pour les entreprises qui cherchent des solutions en aluminium de
            haute qualité. N’hésitez pas à nous contacter pour en savoir plus
            sur notre entreprise et nos produits.
          </p>

          <SocialIcons className="social-icons" />
        </div>

        <div className="flex flex-col gap-6 sm:pl-4">
          <h3 className="text-2xl text-slate-950 font-semibold">Contact</h3>
          <ul className="flex flex-col gap-3">
            {contacts.map(({ icon: Icon, href, text }, index) => (
              <li key={index}>
                <Link className="icon-link" href={href}>
                  <Icon
                    style={{
                      height: "1.4cap",
                      width: "auto",
                    }}
                  />{" "}
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.884069181586!2d-17.449299289408426!3d14.719145754506973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1739979d58f0d%3A0xf271b6fbe2d2124!2sETS%20MBAYE%20ET%20FRERES!5e0!3m2!1sfr!2ssn!4v1720905489766!5m2!1sfr!2ssn"
          className="w-full aspect-video border-4 rounded-md border-primary"
          loading="lazy"
        />
      </div>

      <div className="pt-2 pb-4 bg-primary">
        <p className="text-center text-sm text-background">
          &copy; 2023 BMB by Ets Mbaye & Frères. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
