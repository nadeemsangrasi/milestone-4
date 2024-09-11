"use client";
import Loader from "@/components/shared/Loader";

import { Button } from "@/components/ui/button";
import { usePosts } from "@/contexts/PostsContext";
import { ICategories } from "@/types/types";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
const colors = [
  "bg-pink-500 dark:bg-pink-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-red-500 dark:bg-red-700",
];
const Categories = () => {
  const { categories, isLoadingCategories } = usePosts();
  const [category, setCategory] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setCategory(
      categories.map((cate: ICategories, index: number) => {
        const assignedColor = colors[index % colors.length];
        return { ...cate, color: assignedColor };
      })
    );
  }, [categories]);

  return (
    <>
      {isLoadingCategories ? (
        <>
          <Loader label="Loading categories" />
        </>
      ) : (
        <>
          {category.map(({ id, name, color, slug }: ICategories) => (
            <Button
              key={id}
              className={` font-bold text-xl sm:text-2xl ${color}`}
              onClick={() => router.push("/category/" + slug)}
            >
              {name}
            </Button>
          ))}
        </>
      )}
    </>
  );
};

export default Categories;
