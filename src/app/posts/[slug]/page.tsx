import Wrapper from "@/components/shared/Wrapper";
import Post from "../Post";
import Categories from "@/components/sections/categoriesSection/Categories";
import { fetchCommentsFromDb } from "@/lib/fetchComments";
import CommentSection from "../CommentSection";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
import { getSinglePost } from "@/lib/getSinglePost";

const PostPage = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
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
