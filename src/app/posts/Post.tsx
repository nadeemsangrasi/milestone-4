"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CustomSession, IResponsePost } from "@/types/types";
import dayjs from "dayjs";
import { usePosts } from "@/contexts/PostsContext";
const Post = ({ post }: { post: IResponsePost }): JSX.Element => {
  const { data } = useSession();
  const session = data as CustomSession;
  const { getSingleCategory } = usePosts()!;
  const category = getSingleCategory(post?.categorySlug);

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
      <div className="mt-4 space-y-2">
        <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left my-2 mt-12">
          {post?.title}
        </h1>
        <p className="text-sunset-orange text-center font-bold lg:text-start">
          {category?.name.toUpperCase()}
        </p>
        <div className="flex items-center gap-2 justify-center lg:justify-normal">
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
              {post?.userId === session?.user?.id ? "you" : post?.username}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {dayjs(post?.createdAt).format("DD/MM/YYYY")}
            </p>
            <span className="text-black dark:text-white">
              {post.isEdited ? "edited" : ""}
            </span>
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
