"use client";
import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CustomSession, IResponsePost } from "@/types/types";
import dayjs from "dayjs";
import Link from "next/link";
import { usePosts } from "@/contexts/PostsContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const MyPostCard = ({ post }: { post: IResponsePost }): JSX.Element => {
  const { data, status } = useSession();
  const session = data as CustomSession;
  const { getSingleCategory, editPost, deletePost } = usePosts()!;
  const category = getSingleCategory(post.categorySlug);
  const router: AppRouterInstance = useRouter();

  return (
    <div className="w-[450px] h-[600px] mx-auto lg:mx-0">
      <div>
        <Image
          src={post?.imageUrl}
          alt="post image"
          className="w-full rounded-lg"
          width={1000}
          height={1000}
        />
      </div>
      <div className="space-y-1 py-2 text-center lg:text-left font-bold">
        <span className="text-red-500 text-lg px-1 ">
          {category?.name?.toUpperCase()}
        </span>
        <div className="flex items-center gap-2 justify-center lg:justify-normal">
          <Image
            src={post?.userImageUrl}
            alt="image"
            className="w-[50px] h-[50px] rounded-full"
            height={1000}
            width={1000}
          />
          <div>
            <p className="font-semibold text-black dark:text-white">you</p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {dayjs(post?.createdAt).format("DD/MM/YYYY")}
            </p>
            <span>{post?.isEdited ? "edited" : ""}</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <p className="text-sm sm:text-lg ">
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content.slice(0, 100) + "....",
            }}
          />
        </p>
        <div className="lg:flex gap-4 items-center justify-center lg:justify-normal pt-1">
          <Button className="bg-sunset-orange text-lg sm:text-2xl font-semibold dark:text-white ">
            <Link href={"/posts/" + post?.slug}>Read more</Link>
          </Button>
          {status === "authenticated" && session.user.id === post?.userId && (
            <div className="flex items-center justify-center gap-4 pt-2 lg:pt-0">
              <Edit3
                size={30}
                strokeWidth={3}
                absoluteStrokeWidth
                className="cursor-pointer  "
                onClick={() => {
                  router.push("/write?postSlug=" + post?.slug);
                  editPost(post);
                }}
              />
              <Trash
                className="cursor-pointer "
                size={30}
                strokeWidth={3}
                absoluteStrokeWidth
                onClick={() => deletePost(post)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
