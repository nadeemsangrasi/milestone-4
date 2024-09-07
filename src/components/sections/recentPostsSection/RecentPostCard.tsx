"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { CustomSession, IResponsePost } from "@/types/types";

import dayjs from "dayjs";

import Link from "next/link";

const RecentPostCard = ({
  post,
  category,
}: {
  post: IResponsePost;
  category: string;
}) => {
  const { data, status } = useSession();
  const session = data as CustomSession;

  return (
    <div className="lg:flex  justify-between lg:w-[98%] gap-4">
      <div className="lg:w-1/2">
        <Image
          src={post.imageUrl}
          alt="image"
          className="w-full rounded-lg"
          height={1000}
          width={1000}
        />
      </div>
      <div className="space-y-4 lg:w-1/2 sm:px-4 py-2 text-center lg:text-left">
        <span className="text-red-500 text-lg sm:text-xl">{category}</span>
        <div className="flex items-center gap-2 justify-center md:justify-normal">
          <Image
            src={post.userImageUrl}
            alt="image"
            className="w-[40px] h-[40px] rounded-full"
            height={1000}
            width={1000}
          />
          <div>
            <p className="font-semibold text-black dark:text-white">
              {post.userId === session?.user.id ? "you" : post.username}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {" "}
              {dayjs(post.createdAt).format("DD/MM/YYYY")}...
            </p>
          </div>
        </div>
        <h1 className="text-3xl sm:text-3xl font-bold">{post.title}</h1>

        <p className="text-lg sm:text-xl">
          {post.content.split("<p>")[1].slice(0, 100)}....
        </p>
        <div className="flex gap-4 items-center">
          <Button className="bg-sunset-orange text-xl sm:text-2xl font-semibold ">
            <Link href={"/posts/" + post.slug}>Read more</Link>
          </Button>
          {status === "authenticated" && session.user.id === post?.userId && (
            <>
              <Edit3 size={30} strokeWidth={3} absoluteStrokeWidth />
              <Trash size={30} strokeWidth={3} absoluteStrokeWidth />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;
