"use client";
import React from "react";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { CustomSession, IResponsePost } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { getSingleCategory } from "@/lib/getSingleCategory";
import dayjs from "dayjs";
const Post = ({ post }: { post: IResponsePost }) => {
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data, status } = useSession();
  const [comment, setComment] = useState("");
  const session = data as CustomSession;

  const [category, setCategory] = useState("");
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const setCate = async () => {
      const res = await getSingleCategory(post?.categorySlug || "");
      setCategory(res.name);
    };
    setCate();
  }, []);
  return (
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
            <p className="font-semibold text-black dark:text-white">
              {" "}
              {post?.userId === session?.user.id ? "you" : post?.username}
            </p>
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
  );
};

export default Post;
