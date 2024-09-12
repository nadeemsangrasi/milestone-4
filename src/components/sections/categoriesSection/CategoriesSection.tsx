"use client";
import Loader from "@/components/shared/Loader";
import { usePosts } from "@/contexts/PostsContext";
import { ICategories, IPostContext } from "@/types/types";

import React, { useEffect, useState } from "react";
const colors = [
  "bg-pink-500 dark:bg-pink-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-red-500 dark:bg-red-700",
];
import Wrapper from "@/components/shared/Wrapper";
import Categories from "./Categories";
const CategoriesSection = (): JSX.Element => {
  const { categories, isLoadingCategories } = usePosts() as IPostContext;
  const [category, setCategory] = useState<ICategories[]>([]);

  useEffect(() => {
    setCategory(
      categories.map((cate: ICategories, index: number) => {
        const assignedColor = colors[index % colors.length];
        return { ...cate, color: assignedColor };
      })
    );
  }, [categories]);
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left">
        Popular Categories
      </h1>
      {isLoadingCategories && <Loader label="Loading categories..." />}
      <div className="mt-6 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-6 gap-4">
        {category.map(({ id, name, color, slug }: ICategories) => (
          <Categories
            key={id}
            name={name}
            color={color as string}
            slug={slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
