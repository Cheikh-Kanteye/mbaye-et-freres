"use client";
import { useEffect, useState } from "react";
import { fetchProduits } from "../_actions"; // Assurez-vous que ce chemin est correct
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
import GridSkeleton from "@/components/GridSkeleton";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const nomCategory = params.category.replace(/-/g, " ");
  const [produits, setProduits] = useState<Produit[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      const result = await fetchProduits(nomCategory, "categorie");
      setProduits(result as never);
      setPending(false);
    };

    fetchData();
  }, [nomCategory]);

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
              <BreadcrumbPage>{nomCategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {pending ? (
        <GridSkeleton className="grid grid-cols-4" />
      ) : (
        <ProductGridList produits={produits} />
      )}
    </main>
  );
};

export default CategoryPage;
