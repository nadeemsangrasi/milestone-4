"use client";

import Wrapper from "@/components/shared/Wrapper";
import RecentPostCard from "./RecentPostCard";
import { usePosts } from "@/contexts/PostsContext";
import { IResponsePost } from "@/types/types";
import Loader from "@/components/shared/Loader";

const RecentPostsSection = () => {
  const { posts, isLoading } = usePosts();

  return (
    <Wrapper>
      <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left mb-6">
        Recent Post
      </h1>
      <div className="space-y-8">
        {isLoading && (
          <div className="text-center">
            <Loader label="Loading posts..." />
          </div>
        )}
        {posts.length === 0 ? (
          <h1 className="mx-2 text-xl font-semibold">No posts found</h1>
        ) : (
          posts.map((post: IResponsePost) => (
            <RecentPostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </Wrapper>
  );
};

export default RecentPostsSection;
