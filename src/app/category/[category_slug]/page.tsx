"use client";
import MyPostCard from "@/app/allPosts/MyPostCard";
import Loader from "@/components/shared/Loader";
import Wrapper from "@/components/shared/Wrapper";
import { usePosts } from "@/contexts/PostsContext";

import { IResponsePost } from "@/types/types";

const CategoryPage = ({
  params,
}: {
  params: { category_slug: string };
}): JSX.Element => {
  const { category_slug } = params;

  const { posts, isLoading, getSingleCategory } = usePosts()!;
  const category = getSingleCategory(category_slug)?.name;

  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Explore {category} posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          {isLoading && (
            <div className="text-center">
              <Loader label={`Loading ${category} posts...`} />
            </div>
          )}
          {posts.length === 0 && !isLoading ? (
            <h1 className="mx-2 text-xl font-semibold">No posts found</h1>
          ) : (
            posts
              .filter(
                (post: IResponsePost) => post.categorySlug === category_slug
              )
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

export default CategoryPage;
