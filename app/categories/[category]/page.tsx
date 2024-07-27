"use client";

import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { categories } from "@/constants/categories";

interface Params {
  params: {
    category: string;
  };
}

const Categories = ({ params }: Params) => {
  const { category } = params;

  // Trouver la catégorie correspondant au paramètre
  const selectedCategory = categories.find(
    (cat) => slugify(cat.name) === category
  );

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  if (!selectedCategory) {
    return <div>Category not found</div>;
  }

  return (
    <main className="min-h-screen py-6">
      <div className="container items-start flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/categories">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {selectedCategory.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6">
          {selectedCategory.subcategories?.map((cat, i) => {
            return (
              <div key={i}>
                <Link href={`/categories/${selectedCategory.name}/${cat.href}`}>
                  {cat.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Categories;
