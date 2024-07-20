import { slugify } from "@/utils/slugify"; // Assurez-vous de créer ce fichier utilitaire

export type Category = {
  name: string;
  href: string;
  subcategories?: Category[];
};

export const categories: Category[] = [
  {
    name: "aluminium",
    href: slugify("aluminium"),
    subcategories: [
      { name: "garde corps", href: slugify("garde corps") },
      { name: "brise soleil", href: slugify("brise soleil") },
      { name: "profile vitrine", href: slugify("profile vitrine") },
      {
        name: "ouverture à la française",
        href: slugify("ouverture à la française"),
      },
      {
        name: "ouvertures coulissantes",
        href: slugify("ouvertures coulissantes"),
      },
      { name: "accessoires aluminium", href: slugify("accessoires aluminium") },
      {
        name: "cloisonnement de bureau",
        href: slugify("cloisonnement de bureau"),
      },
      { name: "systèmes murs rideaux", href: slugify("systèmes murs rideaux") },
    ],
  },
  {
    name: "fer forgé",
    href: slugify("fer forgé"),
    subcategories: [
      { name: "fleurs", href: slugify("fleurs") },
      { name: "flèches", href: slugify("flèches") },
      { name: "barres de grille", href: slugify("barres de grille") },
      { name: "fer décoratifs", href: slugify("fer décoratifs") },
      { name: "boules décoratives", href: slugify("boules décoratives") },
      { name: "pièces décoratives", href: slugify("pièces décoratives") },
      { name: "goujons et crochets", href: slugify("goujons et crochets") },
      { name: "profiles métalliques", href: slugify("profiles métalliques") },
    ],
  },
  {
    name: "inox",
    href: slugify("inox"),
    subcategories: [
      { name: "balustrade", href: slugify("balustrade") },
      { name: "outillage", href: slugify("outillage") },
      { name: "décorations", href: slugify("décorations") },
      { name: "profile inox", href: slugify("profile inox") },
      { name: "toile inox", href: slugify("toile inox") },
      { name: "cabine de douche", href: slugify("cabine de douche") },
      { name: "mélange bois inox", href: slugify("mélange bois inox") },
      {
        name: "accessoires rampes inox",
        href: slugify("accessoires rampes inox"),
      },
      {
        name: "accessoires vitrine inox",
        href: slugify("accessoires vitrine inox"),
      },
    ],
  },
  {
    name: "system galva",
    href: slugify("system galva"),
    subcategories: [
      { name: "balustrades et barres", href: slugify("balustrades et barres") },
      { name: "accessoires galva", href: slugify("accessoires galva") },
    ],
  },
  {
    name: "vitrerie",
    href: slugify("vitrerie"),
    subcategories: [
      { name: "verres armés", href: slugify("verres armés") },
      { name: "verres crépis", href: slugify("verres crépis") },
      { name: "verres films", href: slugify("verres films") },
      { name: "verres simples", href: slugify("verres simples") },
      { name: "verres miroirs", href: slugify("verres miroirs") },
      { name: "verres triplex", href: slugify("verres triplex") },
      { name: "verres stopsol", href: slugify("verres stopsol") },
      { name: "verres décoratifs", href: slugify("verres décoratifs") },
      { name: "verres imprimés", href: slugify("verres imprimés") },
      {
        name: "accessoires porte clartés",
        href: slugify("accessoires porte clartés"),
      },
      {
        name: "portes clartés trempées",
        href: slugify("portes clartés trempées"),
      },
    ],
  },
  {
    name: "support d'impression",
    href: slugify("support d'impression"),
    subcategories: [
      { name: "vinyl autocollant", href: slugify("vinyl autocollant") },
      { name: "bâches", href: slugify("bâches") },
    ],
  },
  {
    name: "feuille films",
    href: slugify("feuille films"),
    subcategories: [
      {
        name: "feuille films décoratifs",
        href: slugify("feuille films décoratifs"),
      },
      { name: "sécurité & solaire", href: slugify("sécurité & solaire") },
      { name: "vinyl & miroirs", href: slugify("vinyl & miroirs") },
      {
        name: "réfléchissante & automobile",
        href: slugify("réfléchissante & automobile"),
      },
      { name: "outillages films", href: slugify("outillages films") },
    ],
  },
  {
    name: "plexiglass",
    href: slugify("plexiglass"),
    subcategories: [
      { name: "plexi décoratif", href: slugify("plexi décoratif") },
      { name: "plexiglass simple", href: slugify("plexiglass simple") },
      {
        name: "polycarbonate alvéolaire",
        href: slugify("polycarbonate alvéolaire"),
      },
      { name: "polycarbonate solide", href: slugify("polycarbonate solide") },
    ],
  },
  {
    name: "rideau métallique",
    href: slugify("rideau métallique"),
    subcategories: [
      { name: "accessoires", href: slugify("accessoires") },
      { name: "lame", href: slugify("lame") },
      { name: "tube", href: slugify("tube") },
      { name: "moteur", href: slugify("moteur") },
    ],
  },
  {
    name: "panneau de revêtement",
    href: slugify("panneau de revêtement"),
    subcategories: [
      { name: "extérieur alucobond", href: slugify("extérieur alucobond") },
      { name: "extérieur accessoires", href: slugify("extérieur accessoires") },
      { name: "intérieur alucobond", href: slugify("intérieur alucobond") },
    ],
  },
  {
    name: "toiture",
    href: slugify("toiture"),
    subcategories: [
      { name: "faux plafond", href: slugify("faux plafond") },
      { name: "gouttière pvc", href: slugify("gouttière pvc") },
      { name: "tôle", href: slugify("tôle") },
      { name: "tôle pvc", href: slugify("tôle pvc") },
      { name: "tôle zinc", href: slugify("tôle zinc") },
      { name: "tuile fibrociment", href: slugify("tuile fibrociment") },
      { name: "tuiles métalliques", href: slugify("tuiles métalliques") },
    ],
  },
  { name: "porte", href: slugify("porte") },
  { name: "étanchéité", href: slugify("étanchéité") },
  { name: "groupe électrogène", href: slugify("groupe électrogène") },
  { name: "alarmes et détecteurs", href: slugify("alarmes et détecteurs") },
  { name: "volets roulants", href: slugify("volets roulants") },
  { name: "quincaillerie", href: slugify("quincaillerie") },
  { name: "pneus", href: slugify("pneus") },
];
