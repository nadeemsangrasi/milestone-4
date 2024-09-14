import Wrapper from "@/components/shared/Wrapper";
import Post from "../Post";
import CommentSection from "../CommentSection";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
import { getSinglePost } from "@/lib/getSinglePost";
import CategoriesSection from "@/components/sections/categoriesSection/CategoriesSection";
import { IResponsePost } from "@/types/types";

export const generateStaticParams = async () => {
  const posts = await fetchPostsFromDb();

  if (!posts || !posts.data || !Array.isArray(posts.data)) {
    console.error("Error fetching posts or invalid data structure");
    return [];
  }

  return posts.data.map((post: IResponsePost) => ({
    slug: post.slug,
  }));
};

const PostPage = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { slug } = params;
  const post = await getSinglePost(slug);
  const posts = await fetchPostsFromDb();
  const postList = posts?.data
    ? posts.data
        .sort(
          (a: IResponsePost, b: IResponsePost) => Number(b.id) - Number(a.id)
        )
        .slice(0, 4)
    : [];
  return (
    <Wrapper>
      <div className="py-16">
        <Post post={post} />
        <CategoriesSection />
        <CommentSection post={post} posts={postList} />
      </div>
    </Wrapper>
  );
};

export default PostPage;
