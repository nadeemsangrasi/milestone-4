// "use client";
import Loader from "@/components/shared/Loader";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchCategoriesFromDb } from "@/lib/fetchCategories";
import { ICategories, IResponse } from "@/types/types";
import React, { useEffect, useState } from "react";

export const colors = [
  "bg-pink-500 dark:bg-pink-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-red-500 dark:bg-red-700",
];

const Categories = async () => {
  //   const [categories, setCategories] = useState<any>([]);
  //   const [Error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const { toast } = useToast();

  const res: any = await fetchCategoriesFromDb();
  const categories = res.data.map((cate: ICategories, index: number) => {
    return { ...cate, color: colors[index] };
  });
  //   useEffect(() => {
  //     const setData = async () => {
  //       setLoading(true);

  //       if (!res.success) {
  //         setError(res.message);
  //         console.error(res.message);
  //         toast({
  //           title: "Error fetching categories",
  //           description: res.message,
  //           variant: "destructive",
  //         });
  //       }
  //       const updatedCategories = res.data.map(
  //         (data: ICategories, index: number) => {
  //           return { ...data, color: colors[index] };
  //         }
  //       );
  //       setCategories(updatedCategories);
  //       setLoading(false);
  //     };
  //     setData();
  //   }, []);
  return (
    <>
      {/* {loading ? (
        <>
          <Loader label="Loading categories" />
          {Error && Error}
        </>
      ) : ( */}
      <>
        {/* {Error && Error} */}
        {categories.map(({ id, name, color }: ICategories) => (
          <Button key={id} className={`font-bold text-xl sm:text-2xl ${color}`}>
            {name}
          </Button>
        ))}
      </>
      {/* )} */}
    </>
  );
};

export default Categories;
