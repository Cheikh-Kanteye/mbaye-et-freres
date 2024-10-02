import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import App from "./_app";

const redHatDisplay = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | BMB Matériaux de Construction - Mbaye & Frère",
    default: "BMB | Matériaux de Construction - Mbaye & Frère",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Découvrez une large gamme de matériaux de construction de qualité supérieure chez BMB. Fournisseur de confiance pour tous vos besoins en aluminium, verre, et bien plus. Services sur mesure disponibles : cintrage aluminium, sablage de verre, découpage numérique.",
  keywords:
    "matériaux de construction, aluminium, verre, cintrage, sablage, découpage numérique, double vitrage, Mbaye & Frère",
  openGraph: {
    title: "BMB | Matériaux de Construction - Mbaye & Frère",
    description:
      "Spécialistes en matériaux de construction et services sur mesure : aluminium, verre, découpage numérique. Découvrez nos produits et services de haute qualité.",
    url: "https://mbaye-et-freres.vercel.app",
    siteName: "BMB | Mbaye & Frère",
    images: [
      {
        url: "/images/bmb.jpg",
        width: 1200,
        height: 630,
        alt: "BMB - Matériaux de Construction - Mbaye & Frère",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bmb_frere",
    title: "BMB | Matériaux de Construction - Mbaye & Frère",
    description:
      "Votre fournisseur de confiance en matériaux de construction avec des services sur mesure : aluminium, verre, sablage, découpage numérique.",
    images: "/images/twitter-card.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${redHatDisplay.className}`}>
        <App>{children}</App>
      </body>
    </html>
  );
}
