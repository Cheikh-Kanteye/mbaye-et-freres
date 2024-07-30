import { categories } from "@/constants/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <div className="w-full h-[150px] grid place-content-center bg-primary-foreground">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
          Tous les categories
        </h1>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 grid-cols-2 grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-6">
        {categories.map((category, i) => (
          <Link
            href={`/categories/${category.href}`}
            className="categorie-card border"
            key={i}
          >
            <Image
              src={"/images/fallback-image.jpg"}
              alt="categorie image"
              layout="fill"
              className="w-full h-full object-cover"
            />
            <div className="categorie-title">
              <h3>{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CategoriesPage;
