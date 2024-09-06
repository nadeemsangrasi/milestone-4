"use client";
import Loader from "@/components/shared/Loader";
import Wrapper from "@/components/shared/Wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchCategoriesFromDb } from "@/lib/fetchCategories";
import { ICategories, IResponse } from "@/types/types";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export const colors = [
  "bg-pink-500 dark:bg-pink-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-red-500 dark:bg-red-700",
];
const CategoriesSection = () => {
  const [categories, setCategories] = useState<any>([]);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const setData = async () => {
      setLoading(true);

      const res: any = await fetchCategoriesFromDb();
      if (!res.success) {
        setError(res.message);
        console.error(res.message);
        toast({
          title: "Error fetching categories",
          description: res.message,
          variant: "destructive",
        });
      }
      const updatedCategories = res.data.map(
        (data: ICategories, index: number) => {
          return { ...data, color: colors[index] };
        }
      );
      setCategories(updatedCategories);
      setLoading(false);
    };
    setData();
  }, []);
  return (
    <Wrapper>
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left">
          Popular Categories
        </h1>
        {loading ? (
          <>
            <Loader label="Loading categories" />
            {Error && Error}
          </>
        ) : (
          <div className="mt-6 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Error && Error}
            {categories.map(({ id, name, color }: ICategories) => (
              <Button
                key={id}
                className={`font-bold text-xl sm:text-2xl ${color}`}
              >
                {name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CategoriesSection;
