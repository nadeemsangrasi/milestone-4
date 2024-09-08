"use client";
import Wrapper from "@/components/shared/Wrapper";
import MyPostCard from "./MyPostCard";
import { IResponsePost } from "@/types/types";
import { usePosts } from "@/contexts/PostsContext";
import Loader from "@/components/shared/Loader";

const MyPosts = () => {
  const { posts, isLoading, getSingleCategory } = usePosts();

  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Explore your posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          {isLoading && (
            <div className="text-center">
              <Loader label="Loading Posts" />
            </div>
          )}
          {posts.map((post: IResponsePost) => (
            <MyPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default MyPosts;
