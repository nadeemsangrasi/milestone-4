"use client";
import Loader from "@/components/shared/Loader";
import Wrapper from "@/components/shared/Wrapper";
import { CustomSession, IResponsePost } from "@/types/types";

import React from "react";
import MyPostCard from "../allPosts/MyPostCard";
import { useSession } from "next-auth/react";
import { usePosts } from "@/contexts/PostsContext";

const MyPostsPage = (): JSX.Element => {
  const { data } = useSession();
  const session = data as CustomSession;

  const { posts, isLoading } = usePosts()!;
  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Explore your posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          {isLoading && (
            <div className="text-center">
              <Loader label="Loading your posts..." />
            </div>
          )}
          {posts.length === 0 && !isLoading ? (
            <h1 className="mx-2 text-xl font-semibold">No posts found</h1>
          ) : (
            posts
              .filter((post: IResponsePost) => post.userId === session?.user.id)
              .sort(
                (a: IResponsePost, b: IResponsePost) =>
                  Number(b.id) - Number(a.id)
              )
              .map((post: IResponsePost) => (
                <MyPostCard key={post.id} post={post} />
              ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default MyPostsPage;
