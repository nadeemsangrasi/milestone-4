import axios, { AxiosError } from "axios";

export const fetchPostsFromDb = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/blog/post");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
