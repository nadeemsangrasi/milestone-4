"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit3, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { CustomSession, IPostContext, IResponsePost } from "@/types/types";

import dayjs from "dayjs";
import Link from "next/link";
import { usePosts } from "@/contexts/PostsContext";
import { useRouter } from "next/navigation";

const RecentPostCard = ({ post }: { post: IResponsePost }): JSX.Element => {
  const { data, status } = useSession();
  const session = data as CustomSession;
  const { getSingleCategory, editPost, deletePost } =
    usePosts() as IPostContext;
  const category = getSingleCategory(post?.categorySlug);
  const router = useRouter();

  return (
    <div className="lg:flex  justify-between lg:w-[98%] gap-4">
      <div className="lg:w-1/2">
        <Image
          src={post?.imageUrl}
          alt="image"
          className="w-full rounded-lg"
          height={1000}
          width={1000}
        />
      </div>
      <div className="space-y-3 sm:space-y-2 lg:w-1/2 sm:px-4  text-center lg:text-left py-2">
        <span className="text-red-500 text-lg px-1 font-bold">
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
            <p className="font-semibold text-black dark:text-white">
              {post?.userId === session?.user.id ? "you" : post?.username}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-400  ]">
              {" "}
              {dayjs(post?.createdAt).format("DD/MM/YYYY")}...
            </p>
            <span className="text-black dark:text-white ">
              {post.isEdited ? "edited" : ""}
            </span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">{post?.title}</h1>
        <p className="text-lg sm:text-xl">
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content.slice(0, 100) + "....",
            }}
          />
        </p>
        <div className="lg:flex gap-4 items-center flex-wrap ">
          <Button className="bg-sunset-orange text-lg sm:text-2xl font-semibold dark:text-white hover:bg-orange-400">
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

export default RecentPostCard;
