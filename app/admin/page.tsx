import { IconType } from "react-icons";
import { RiBox3Line } from "react-icons/ri";
import { BsSuitcaseLg } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { GiFamilyTree } from "react-icons/gi";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const cards = await getDashboardData();

  return (
    <main>
      <section className="max-w-screen-xl gap-4 mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-6">
        {cards.map(({ label, count, path, icon: Icon }, index) => (
          <DashboardCard
            key={index}
            path={path}
            label={label}
            count={count}
            icon={Icon}
          />
        ))}
      </section>
    </main>
  );
}

type DCProps = {
  label: string;
  count: number;
  path: string;
  icon: IconType;
};

function DashboardCard({ label, count, path, icon: Icon }: DCProps) {
  return (
    <div className="p-4 rounded-md border hover:hover-animate">
      <Link href={path}>
        <div className="flex items-center justify-between">
          <p className="text-base">Total {label}</p>
          <Icon aria-label={`Icon for ${label}`} />
        </div>
        <h2 className="text-xl font-bold">
          {count} {label}
        </h2>
      </Link>
    </div>
  );
}

// Fonction pour récupérer les données du tableau de bord
async function getDashboardData() {
  try {
    const [serviceCount, productCount, categoryCount, familleCount] =
      await Promise.all([
        prisma.service.count(),
        prisma.produit.count(),
        prisma.categories.count(),
        prisma.familles.count(),
      ]);

    return [
      {
        label: "produits",
        count: productCount,
        icon: RiBox3Line,
        path: "/admin/produits",
      },
      {
        label: "categories",
        count: categoryCount,
        icon: BiCategory,
        path: "/admin/categories",
      },
      {
        label: "familles",
        count: familleCount,
        icon: GiFamilyTree,
        path: "/admin/familles",
      },
      {
        label: "services",
        count: serviceCount,
        icon: BsSuitcaseLg,
        path: "/admin/services",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}
