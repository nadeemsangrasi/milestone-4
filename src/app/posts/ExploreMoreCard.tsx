"use client";

import { usePosts } from "@/contexts/PostsContext";
import { ICategories, IResponsePost } from "@/types/types";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ExploreMoreCard = ({
  post,
  user,
}: {
  post: IResponsePost;
  user: any;
}) => {
  const { getSingleCategory } = usePosts();
  const category = getSingleCategory(post.categorySlug);

  return (
    <div className="w-[450px] h-fit">
      <div className="space-y-2  py-2 text-center lg:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-normal">
          <Image
            src={post.userImageUrl}
            alt="image"
            className="w-[40px] h-[40px] rounded-full"
            height={40}
            width={40}
          />
          <div>
            <p className="font-semibold text-black dark:text-white">
              {post.userId === user?.id ? "you" : post.username}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {dayjs(post.createdAt).format("DD/MM/YYYY")}
            </p>
            <span className="text-red-500 text-sm ">
              {category.name.toUpperCase()}
            </span>
          </div>
        </div>
        <h1 className="sm:text-xl font-bold">{post.title}</h1>
        <p className="text-lg ">
          {post.content.split("<p>")[1].slice(0, 50)}....
        </p>
      </div>
    </div>
  );
};

export default ExploreMoreCard;
