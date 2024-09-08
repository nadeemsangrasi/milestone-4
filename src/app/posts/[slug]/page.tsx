import Wrapper from "@/components/shared/Wrapper";
import Post from "../Post";

import axios, { AxiosError } from "axios";
import Categories from "@/components/sections/categoriesSection/Categories";
import { fetchCommentsFromDb } from "@/lib/fetchComments";

import CommentSection from "../CommentSection";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
const getSinglePost = async (slug: string) => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/blog/post/single-post/" + slug,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching categories");
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getSinglePost(slug);
  const comments = await fetchCommentsFromDb(post.id);
  const posts = await fetchPostsFromDb();

  return (
    <Wrapper>
      <div className="py-16">
        <Post post={post} />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-center lg:text-left">
            Popular Categories
          </h1>
          <div className="mt-6 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Categories />
          </div>
        </div>
        <CommentSection
          post={post}
          comments={comments.data}
          posts={posts.data.slice(0, 4)}
        />
      </div>
    </Wrapper>
  );
};

export default PostPage;
