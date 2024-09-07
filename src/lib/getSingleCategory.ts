import { ICategories } from "@/types/types";
import axios, { AxiosError } from "axios";

export const getSingleCategory = async (categorySlug: string) => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/category");
    return res.data.data.find(
      (category: ICategories) => category.slug === categorySlug
    );
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
