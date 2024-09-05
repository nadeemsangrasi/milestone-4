import { IResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
export const fetchCategoriesFromDb = async (): Promise<
  IResponse | AxiosError
> => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/category");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
