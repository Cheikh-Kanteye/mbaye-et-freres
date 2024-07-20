// pages/categories.tsx
import React from "react";
import Link from "next/link";
import { categories } from "@/constants/categories";

const CategoriesPage: React.FC = () => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              href={`/categories/${encodeURIComponent(
                category.name.toLowerCase()
              )}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
