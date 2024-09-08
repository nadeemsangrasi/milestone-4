"use client";
import Loader from "@/components/shared/Loader";

import { Button } from "@/components/ui/button";
import { usePosts } from "@/contexts/PostsContext";
import { ICategories } from "@/types/types";

import React from "react";

const Categories = () => {
  const { categories, isLoadingCategories } = usePosts();

  return (
    <>
      {isLoadingCategories ? (
        <>
          <Loader label="Loading categories" />
        </>
      ) : (
        <>
          {categories.map(({ id, name, color }: ICategories) => (
            <Button
              key={id}
              className={`font-bold text-xl sm:text-2xl ${color}`}
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
