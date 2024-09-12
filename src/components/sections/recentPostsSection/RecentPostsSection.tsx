"use client";

import Wrapper from "@/components/shared/Wrapper";
import RecentPostCard from "./RecentPostCard";
import { usePosts } from "@/contexts/PostsContext";
import { IPostContext, IResponsePost } from "@/types/types";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RecentPostsSection = (): JSX.Element => {
  const { posts, isLoading } = usePosts() as IPostContext;
  const { status } = useSession();

  const router = useRouter();

  return (
    <Wrapper>
      <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left mb-6">
        Recent posts
      </h1>
      <div className="space-y-8">
        {posts.length === 0 && status !== "loading" && !isLoading && (
          <h2 className="text-center my-8">No posts found</h2>
        )}
        {isLoading && <Loader label="Loading posts..." />}

        {posts
          .sort(
            (a: IResponsePost, b: IResponsePost) => Number(b.id) - Number(a.id)
          )
          .slice(0, 4)
          .map((post: IResponsePost) => (
            <RecentPostCard key={post?.id} post={post} />
          ))}
      </div>

      {!isLoading && posts.length !== 0 && (
        <Button
          className="font-bold text-xl sm:text-2xl my-8 mx-auto flex  "
          onClick={() => router.push("/allPosts")}
        >
          See all posts
        </Button>
      )}
    </Wrapper>
  );
};

export default RecentPostsSection;
