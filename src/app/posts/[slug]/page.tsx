"use client";
import Wrapper from "@/components/shared/Wrapper";

import Image from "next/image";
import { useEffect, useState } from "react";
import img from "@/assets/images/home-3.jpg";
import CommentCard from "./CommentCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomSession, ICategories, IResponsePost } from "@/types/types";
import { Button } from "@/components/ui/button";
import { colors } from "@/components/sections/categoriesSection/CategoriesSection";
import { fetchCategoriesFromDb } from "@/lib/fetchCategories";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
import { getSingleCategory } from "@/lib/getSingleCategory";
import dayjs from "dayjs";

const PostPage = ({ params }: { params: { slug: string } }) => {
  const [categories, setCategories] = useState<any>([]);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data, status } = useSession();
  const [comment, setComment] = useState("");
  const session = data as CustomSession;
  const [post, setPost] = useState<IResponsePost>();
  const { slug } = params;
  const [category, setCategory] = useState("");
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
    const getPost = async () => {
      const res = await fetchPostsFromDb();
      const currentPost = res.data.find(
        (post: IResponsePost) => post.slug === slug
      );
      setPost(currentPost);
    };
    getPost();
    const setCate = async () => {
      const res = await getSingleCategory(post?.categorySlug || "");
      setCategory(res.name);
    };
    setCate();
  }, []);
  return (
    <Wrapper>
      <div className="py-16">
        <div className="my-8 mx-auto">
          <div>
            <Image
              src={post?.imageUrl || ""}
              alt="image"
              className="rounded-lg w-full"
              height={1000}
              width={1000}
            />
          </div>
          <div className="mt-4 space-y-4">
            <h1 className="ext-3xl sm:text-5xl font-bold text-center lg:text-left my-2 mt-12">
              {post?.title}
            </h1>
            <span className="text-sunset-orange font-medium text-xl">
              {category}
            </span>
            <div className="flex items-center gap-2 justify-center md:justify-normal">
              <Image
                src={post?.userImageUrl || ""}
                alt="image"
                className="w-[40px] h-[40px] rounded-full"
                height={1000}
                width={1000}
              />
              <div>
                <p className="font-semibold text-black dark:text-white">you</p>
                <p className="text-sm text-gray-700 dark:text-gray-400  ]">
                  {dayjs(post?.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <p className="text-xl">
              <div dangerouslySetInnerHTML={{ __html: post?.content }} />
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left my-2 mt-12">
            Comments
          </h1>
          {status === "unauthenticated" ? (
            <Link
              href={"/login"}
              className="sm:text-xl text-2xl font-medium border-b-2 border-white inline-block my-2"
            >
              log in to write comment
            </Link>
          ) : status === "loading" ? (
            <Loader2
              size={32}
              strokeWidth={3}
              absoluteStrokeWidth
              className="mx-4 my-4"
            />
          ) : (
            <form>
              <div className="flex gap-2 w-full md:w-1/2 items-center my-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  id="comment"
                  className="py-3 px-2 rounded-lg text-black  w-full bg-gray-300 placeholder:text-black"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <Button className=" text-xl  font-bold">Sand</Button>
              </div>
            </form>
          )}
          <div className="md:flex justify-between">
            <div className="md:w-3/4">
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <div className="md:w-1/3">
              <h1 className="text-2xl font-medium">Explore more</h1>
              {loading ? (
                <>
                  <Loader label="Loading categories" />
                  {Error && Error}
                </>
              ) : (
                <div className="mt-6 grid  md:grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostPage;
