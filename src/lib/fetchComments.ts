import axios, { AxiosError } from "axios";

export const fetchCommentsFromDb = async (postId: string) => {
  try {
    const res = await axios.get(
      "https://milestone-4.vercel.app/api/blog/comment?postId=" + postId
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
