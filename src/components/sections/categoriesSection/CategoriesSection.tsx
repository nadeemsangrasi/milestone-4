import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import React from "react";

const CategoriesSection = () => {
  const categories = [
    { title: "Fashion", color: "bg-pink-500 dark:bg-pink-700" },
    { title: "Food", color: "bg-green-500 dark:bg-green-700" },
    { title: "Coding", color: "bg-blue-500 dark:bg-blue-700" },
    { title: "Travel", color: "bg-yellow-500 dark:bg-yellow-700" },
    { title: "Style", color: "bg-purple-500 dark:bg-purple-700" },
    { title: "Culture", color: "bg-red-500 dark:bg-red-700" },
  ];

  return (
    <Wrapper>
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold ">Popular Categories</h1>
        <div className="my-6 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(({ title, color }) => (
            <Button
              key={title}
              className={`font-bold text-xl sm:text-2xl ${color}`}
            >
              {title}
            </Button>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoriesSection;
