import axios, { AxiosError } from "axios";

export const getSinglePost = async (slug: string) => {
  try {
    const res = await axios.get(
      "https://milestonee-4.vercel.app/api/blog/post/single-post/" + slug,
      {
        headers: {
          "Cache-Control": "no-store", 
          "Pragma": "no-cache",         
          "Expires": "0",               
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    const axiosError = error as AxiosError;
    return axiosError.response ? axiosError.response.data : null;
  }
};
