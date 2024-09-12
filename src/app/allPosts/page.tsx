"use client";
import Wrapper from "@/components/shared/Wrapper";
import MyPostCard from "./MyPostCard";
import { IResponsePost } from "@/types/types";
import { usePosts } from "@/contexts/PostsContext";
import Loader from "@/components/shared/Loader";
import { useSession } from "next-auth/react";

const AllPosts = (): JSX.Element => {
  const { posts, isLoading } = usePosts()!;
  const { status } = useSession();

  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Experience All posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          {posts.length === 0 && status !== "loading" && !isLoading && (
            <h2 className="text-center my-8">No posts found</h2>
          )}
          {isLoading && <Loader label="Loading posts..." />}
          {posts
            .sort(
              (a: IResponsePost, b: IResponsePost) =>
                Number(b.id) - Number(a.id)
            )
            .map((post: IResponsePost) => (
              <MyPostCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default AllPosts;
