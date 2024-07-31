"use client";
import { useEffect, useState } from "react";
import ProductGridList from "@/components/ProductGridList";
import Loader from "@/components/Loader";
import { Produit } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const nomCategory = params.category.replace(/-/g, " ");
  const [produits, setProduits] = useState<Produit[]>([]);
  const [pending, setPending] = useState(false);

  // useEffect(() => {
  //   setPending(true);
  //   fetchProduits(nomFamille)
  //     .then((result) => {
  //       console.log({ result });

  //       setProduits(result as Produit[]);
  //     })
  //     .finally(() => {
  //       setPending(false);
  //     });
  // }, [nomFamille]);

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
        <Loader size={28} />
      ) : (
        <div className="grid grid-cols-4">
          <ProductGridList produits={produits} />
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
