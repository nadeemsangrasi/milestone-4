"use client";
import { useToast } from "@/hooks/use-toast";
import {
  ICategories,
  IResponsePost,
  IPostContext,
  CustomSession,
} from "@/types/types";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext<IPostContext | null>(null);

const PostsContext = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IResponsePost[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const { data } = useSession();
  const session = data as CustomSession;
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
        const res = await axios.get("/api/blog/post");

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
        const res = await axios.get("/api/blog/category");

        if (!res.data.success) {
          toast({
            title: "Faild to fetch categories",
            description: res.data.message,
            variant: "destructive",
          });
        }

        setCategories(res.data.data);
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
  }, [toast]);

  const editPost = (post: IResponsePost) => {
    setIsEditingPost(!isEditingPost);
  };

  const deletePost = async (post: IResponsePost) => {
    try {
      const res: any = await axios.delete(
        `/api/blog/post?userId=${session.user?.id}&postId=${post.id}`
      );
      if (!res.data.success) {
        toast({
          title: "Faild to delete post",
          description: res.data.message,
          variant: "destructive",
        });
      }

      toast({
        title: "post deleted",
        description: res.data.message,
      });
      setPosts(posts.filter((myPost) => myPost.id !== post.id));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Faild to delete ", axiosError);
      toast({
        title: "Faild to delete post",
        description: axiosError.message,
        variant: "destructive",
      });
    }
  };
  return (
    <PostContext.Provider
      value={{
        isLoading,
        posts,
        setPosts,
        categories,
        isLoadingCategories,
        getSingleCategory,
        isEditingPost,
        setIsEditingPost,
        editPost,
        deletePost,
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
