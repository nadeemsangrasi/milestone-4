import axios, { AxiosError } from "axios";

export const fetchPostsByCategory = async (categorySlug: string) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/blog/category/single-category/" + categorySlug,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
