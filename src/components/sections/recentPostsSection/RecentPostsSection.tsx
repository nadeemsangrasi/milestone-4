"use client";

import Wrapper from "@/components/shared/Wrapper";
import RecentPostCard from "./RecentPostCard";
import { usePosts } from "@/contexts/PostsContext";
import { IResponsePost } from "@/types/types";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RecentPostsSection = () => {
  const { posts, isLoading } = usePosts();
  const router = useRouter();

  return (
    <Wrapper>
      <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left mb-6">
        Recent posts
      </h1>
      <div className="space-y-8">
        {isLoading ? (
          <div className="text-center">
            {posts.length === 0 ? (
              <h1 className="mx-2 text-xl font-semibold">No posts found</h1>
            ) : (
              <Loader label="Loading posts..." />
            )}
          </div>
        ) : (
          posts
            .sort(
              (a: IResponsePost, b: IResponsePost) =>
                Number(b.id) - Number(a.id)
            )
            .slice(0, 4)
            .map((post: IResponsePost) => (
              <RecentPostCard key={post?.id} post={post} />
            ))
        )}
      </div>
      <Button
        className="font-bold text-xl sm:text-2xl my-6 mx-auto flex  "
        onClick={() => router.push("/allPosts")}
      >
        See all posts
      </Button>
    </Wrapper>
  );
};

export default RecentPostsSection;
