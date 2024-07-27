"use client";
import { categories } from "@/constants/categories";
import { slugify } from "@/utils/slugify";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Params {
  params: {
    category: string;
    subcategory: string;
  };
}

const SubCategory = ({ params }: Params) => {
  const { category, subcategory } = params;

  // Trouver la catégorie correspondant au paramètre
  const selectedCategory = categories.find(
    (cat) => slugify(cat.name) === category
  );

  if (!selectedCategory) {
    return <div>Category not found</div>;
  }

  // Trouver la sous-catégorie
  const selectedSubcategory = selectedCategory.subcategories?.find(
    (sub) => slugify(sub.name) === subcategory
  );

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
              <BreadcrumbLink className="capitalize" asChild>
                <Link href="/categories/aluminium">
                  {selectedCategory.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {selectedSubcategory.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </main>
  );
};

export default SubCategory;
