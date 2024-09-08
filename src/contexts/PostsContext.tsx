"use client";
import { useToast } from "@/hooks/use-toast";
import { ICategories, IResponsePost } from "@/types/types";
import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext<{
  isLoading: boolean;
  posts: IResponsePost[];
  categories: ICategories[];
  isLoadingCategories: boolean;
  getSingleCategory: (id: string) => any;
} | null>(null);

const colors = [
  "bg-pink-500 dark:bg-pink-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-red-500 dark:bg-red-700",
];
const PostsContext = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IResponsePost[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getSingleCategory = (slug: string) => {
    if (slug && categories.length > 0) {
      return categories.find((cate) => cate.slug === slug);
    } else {
      console.error("Category not found");
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/blog/post");

        if (!res.data.success) {
          toast({
            title: "Faild to fetch post",
            description: res.data.message,
            variant: "destructive",
          });
        }
        setPosts(res.data.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching post", error);
        toast({
          title: "Faild to fetch post",
          description: axiosError.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await axios.get("http://localhost:3000/api/blog/category");

        if (!res.data.success) {
          toast({
            title: "Faild to fetch categories",
            description: res.data.message,
            variant: "destructive",
          });
        }
        const updatedCategories = res.data.data.map(
          (cate: ICategories, index: number) => {
            return { ...cate, color: colors[index] };
          }
        );
        setCategories(updatedCategories);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching categories", error);
        toast({
          title: "Faild to fetch post",
          description: axiosError.message,
          variant: "destructive",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <PostContext.Provider
      value={{
        isLoading,
        posts,
        categories,
        isLoadingCategories,
        getSingleCategory,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostsContext;

export const usePosts = () => {
  return useContext(PostContext);
};
