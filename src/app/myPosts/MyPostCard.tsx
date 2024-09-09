// "use client";
import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

import { IResponsePost } from "@/types/types";

import dayjs from "dayjs";

import Link from "next/link";
import { usePosts } from "@/contexts/PostsContext";
import { useRouter } from "next/navigation";

const MyPostCard = ({ post }: { post: IResponsePost }) => {
  const { getSingleCategory, editPost, deletePost } = usePosts();
  const category = getSingleCategory(post.categorySlug);
  const router = useRouter();

  return (
    <div className="w-[450px] h-[600px]">
      <div>
        <Image
          src={post.imageUrl}
          alt="post image"
          className="w-full rounded-lg"
          width={1000}
          height={1000}
        />
      </div>
      <div className="space-y-2  py-2 text-center lg:text-left">
        <span className="text-red-500 text-lg ">
          {category.name?.toUpperCase()}
        </span>
        <div className="flex items-center gap-2 justify-center md:justify-normal">
          <Image
            src={post.userImageUrl}
            alt="image"
            className="w-[40px] h-[40px] rounded-full"
            height={40}
            width={40}
          />
          <div>
            <p className="font-semibold text-black dark:text-white">you</p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {dayjs(post.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        <h1 className="text-3xl sm:text-2xl font-bold">{post.title}</h1>
        <p className="text-lg ">
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content.slice(0, 100) + "....",
            }}
          />
        </p>
        <div className="flex gap-4 items-center">
          <Button className=" text-lg font-semibold ">
            <Link href={"/posts/" + post.slug}>Read more</Link>
          </Button>
          <Edit3
            size={27}
            strokeWidth={3}
            absoluteStrokeWidth
            className="cursor-pointer"
            onClick={() => {
              router.push("/write?postSlug=" + post.slug);
              editPost(post);
            }}
          />
          <Trash
            size={27}
            strokeWidth={3}
            absoluteStrokeWidth
            className="cursor-pointer"
            onClick={() => deletePost(post)}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
