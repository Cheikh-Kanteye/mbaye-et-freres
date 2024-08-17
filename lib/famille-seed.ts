import fs from "fs";
import prisma from "./prisma";

async function createDefaultFamilles() {
  const existingFamilles = await prisma.familles.findMany();
  if (existingFamilles.length > 0) {
    console.log("Les familles par défaut existent déjà.");
    return;
  }

  // Read famille data from JSON file
  const familleData = JSON.parse(fs.readFileSync("familleData.json", "utf-8"));

  // Create default familles
  await prisma.familles.createMany({
    data: [
      {
        idCategorie: 1,
        nom: "Garde Corps",
        description:
          "Accessoires et structures de protection en aluminium pour les balcons et escaliers.",
      },
      {
        idCategorie: 1,
        nom: "Brise Soleil",
        description:
          "Dispositifs en aluminium pour réduire l'intensité lumineuse tout en permettant la ventilation.",
      },
      {
        idCategorie: 1,
        nom: "Profile Vitrine",
        description:
          "Profils en aluminium utilisés pour la conception de vitrines et de façades.",
      },
      {
        idCategorie: 1,
        nom: "Ouverture à la Française",
        description:
          "Systèmes de fenêtres en aluminium avec ouverture classique vers l'intérieur.",
      },
      {
        idCategorie: 1,
        nom: "Ouvertures Coulissantes",
        description:
          "Systèmes de fenêtres et portes coulissantes en aluminium pour une ouverture fluide.",
      },
      {
        idCategorie: 1,
        nom: "Accessoires Aluminium",
        description:
          "Accessoires divers en aluminium pour les installations et constructions.",
      },
      {
        idCategorie: 1,
        nom: "Cloisonnement de Bureau",
        description:
          "Solutions en aluminium pour diviser les espaces de travail en bureaux modulaires.",
      },
      {
        idCategorie: 1,
        nom: "Systèmes Murs Rideaux",
        description:
          "Systèmes de murs rideaux en aluminium pour des façades modernes et élégantes.",
      },
      {
        idCategorie: 2,
        nom: "Fleurs",
        description:
          "Éléments décoratifs en fer forgé en forme de fleurs pour orner les structures.",
      },
      {
        idCategorie: 2,
        nom: "Flèches",
        description:
          "Décorations en fer forgé en forme de flèches pour les clôtures et portails.",
      },
      {
        idCategorie: 2,
        nom: "Barres de Grille",
        description:
          "Barres en fer forgé utilisées pour créer des grilles de sécurité et des clôtures.",
      },
      {
        idCategorie: 2,
        nom: "Fer Décoratifs",
        description:
          "Éléments décoratifs en fer forgé pour des applications artistiques et ornementales.",
      },
      {
        idCategorie: 2,
        nom: "Boules Décoratives",
        description:
          "Boules en fer forgé pour orner les structures et les éléments de clôture.",
      },
      {
        idCategorie: 2,
        nom: "Pièces Décoratives",
        description:
          "Divers éléments décoratifs en fer forgé pour personnaliser les structures métalliques.",
      },
      {
        idCategorie: 2,
        nom: "Goujons et Crochets",
        description:
          "Goujons et crochets en fer forgé pour diverses applications de fixation et de décoration.",
      },
      {
        idCategorie: 2,
        nom: "Profils Métalliques",
        description:
          "Profils en fer forgé utilisés dans la construction et la décoration.",
      },
      {
        idCategorie: 3,
        nom: "Balustrade",
        description:
          "Balustrades en inox pour les escaliers et les balcons, offrant une sécurité élégante.",
      },
      {
        idCategorie: 3,
        nom: "Outillage",
        description:
          "Outils et équipements en inox pour divers usages industriels et domestiques.",
      },
      {
        idCategorie: 3,
        nom: "Décorations",
        description:
          "Éléments décoratifs en inox pour améliorer l'esthétique des structures.",
      },
      {
        idCategorie: 3,
        nom: "Profile Inox",
        description:
          "Profils en inox pour les constructions et les finitions architecturales.",
      },
      {
        idCategorie: 3,
        nom: "Toile Inox",
        description:
          "Toile en inox utilisée pour les applications de filtration et de protection.",
      },
      {
        idCategorie: 3,
        nom: "Cabine de Douche",
        description:
          "Cabines de douche en inox pour une durabilité et un design moderne.",
      },
      {
        idCategorie: 3,
        nom: "Mélange Bois Inox",
        description:
          "Compositions de bois et inox pour des applications de design et de construction.",
      },
      {
        idCategorie: 3,
        nom: "Accessoires Rampes Inox",
        description: "Accessoires en inox pour les rampes et les balustrades.",
      },
      {
        idCategorie: 3,
        nom: "Accessoires Vitrine Inox",
        description:
          "Accessoires en inox pour les vitrines commerciales et de présentation.",
      },
      {
        idCategorie: 4,
        nom: "Balustrades et Barres",
        description:
          "Balustrades et barres en acier galvanisé pour des applications structurelles et décoratives.",
      },
      {
        idCategorie: 4,
        nom: "Accessoires Galva",
        description:
          "Accessoires divers en acier galvanisé pour les installations et constructions.",
      },
      {
        idCategorie: 5,
        nom: "Verres Armés",
        description:
          "Verres renforcés pour une sécurité accrue dans les fenêtres et les façades.",
      },
      {
        idCategorie: 5,
        nom: "Verres Crépis",
        description:
          "Verres décoratifs avec un effet crépis pour des applications esthétiques.",
      },
      {
        idCategorie: 5,
        nom: "Verres Films",
        description:
          "Verres avec films protecteurs ou décoratifs pour améliorer les performances et l'esthétique.",
      },
      {
        idCategorie: 5,
        nom: "Verres Simples",
        description:
          "Verres simples pour les fenêtres et les applications générales.",
      },
      {
        idCategorie: 5,
        nom: "Verres Miroirs",
        description:
          "Verres avec finition miroir pour des applications décoratives et fonctionnelles.",
      },
      {
        idCategorie: 5,
        nom: "Verres Triplex",
        description:
          "Verres triples pour une meilleure isolation thermique et acoustique.",
      },
      {
        idCategorie: 5,
        nom: "Verres Stopsol",
        description:
          "Verres avec traitement Stopsol pour réduire la chaleur et l'éblouissement.",
      },
      {
        idCategorie: 5,
        nom: "Verres Décoratifs",
        description:
          "Verres avec des motifs et des textures décoratifs pour les façades et les intérieurs.",
      },
      {
        idCategorie: 5,
        nom: "Verres Imprimés",
        description:
          "Verres avec impressions personnalisées pour des applications uniques.",
      },
      {
        idCategorie: 5,
        nom: "Accessoires Porte Clartés",
        description:
          "Accessoires pour les portes en verre clair pour améliorer la fonctionnalité et l'esthétique.",
      },
      {
        idCategorie: 5,
        nom: "Portes Clartés Trempées",
        description:
          "Portes en verre trempé pour une sécurité et une durabilité accrues.",
      },
      {
        idCategorie: 6,
        nom: "Vinyl Autocollant",
        description:
          "Vinyl autocollant pour des applications d'impression et de signalisation.",
      },
      {
        idCategorie: 6,
        nom: "Bâches",
        description:
          "Bâches pour l'impression de grandes surfaces, utilisées pour les affichages publicitaires.",
      },
      {
        idCategorie: 7,
        nom: "Feuille Films Décoratifs",
        description:
          "Films décoratifs pour personnaliser et embellir diverses surfaces.",
      },
      {
        idCategorie: 7,
        nom: "Sécurité & Solaire",
        description:
          "Films pour la sécurité et la protection solaire des fenêtres et surfaces vitrées.",
      },
      {
        idCategorie: 7,
        nom: "Vinyl & Miroirs",
        description:
          "Films en vinyl et miroirs pour des applications décoratives et fonctionnelles.",
      },
      {
        idCategorie: 7,
        nom: "Réfléchissante & Automobile",
        description:
          "Films réfléchissants pour les applications automobiles et de sécurité.",
      },
      {
        idCategorie: 7,
        nom: "Outillages Films",
        description:
          "Films spécialisés pour les applications d'outillage et de protection.",
      },
      {
        idCategorie: 8,
        nom: "Plexi Décoratif",
        description:
          "Plexiglass utilisé pour des applications décoratives et créatives.",
      },
      {
        idCategorie: 8,
        nom: "Plexiglass Simple",
        description:
          "Plexiglass standard pour les fenêtres et les panneaux de séparation.",
      },
      {
        idCategorie: 9,
        nom: "Générateurs",
        description:
          "Générateurs électriques pour des applications industrielles et domestiques.",
      },
      {
        idCategorie: 10,
        nom: "Systèmes d'Alarme",
        description:
          "Systèmes d'alarme pour la sécurité résidentielle et commerciale.",
      },
      {
        idCategorie: 11,
        nom: "Rollers",
        description:
          "Rollers pour les portes et fenêtres pour un contrôle facile de l'ouverture et de la fermeture.",
      },
      {
        idCategorie: 12,
        nom: "Rideaux Métalliques",
        description:
          "Rideaux métalliques pour la sécurité des ouvertures commerciales et industrielles.",
      },
      {
        idCategorie: 13,
        nom: "Matériel Quincaillerie",
        description:
          "Divers matériels de quincaillerie pour les réparations et installations.",
      },
      {
        idCategorie: 14,
        nom: "Pneus",
        description: "Pneus pour différents types de véhicules.",
      },
    ],
  });

  console.log("Familles par défaut créées avec succès.");
}

createDefaultFamilles()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
