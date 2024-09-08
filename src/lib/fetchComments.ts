import axios, { AxiosError } from "axios";

export const fetchCommentsFromDb = async (postId: string) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/blog/comment?postId=" + postId
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
