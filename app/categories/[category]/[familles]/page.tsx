"use client";
import { useEffect, useState } from "react";
import { fetchProduits } from "../../_actions";
import ProductGridList from "@/components/ProductGridList";
import { Produit } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Loader from "@/components/Loader";
import GridSkeleton from "@/components/GridSkeleton";

const FamillesPage = ({
  params,
}: {
  params: { category: string; familles: string };
}) => {
  const nomCategory = params.category.replace(/-/g, " ");
  const nomFamille = params.familles.replace(/-/g, " ");
  const [produits, setProduits] = useState<Produit[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetchProduits(nomFamille, "famille")
      .then((result) => {
        setProduits(result as never);
      })
      .finally(() => {
        setPending(false);
      });
  }, [nomFamille]);

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto p-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <Link href={"/categories"}>Categories</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={`/categories/${nomCategory}`}>{nomCategory}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {produits.length > 0 && produits[0].familles.nom}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {pending ? <GridSkeleton /> : <ProductGridList produits={produits} />}
    </main>
  );
};

export default FamillesPage;
