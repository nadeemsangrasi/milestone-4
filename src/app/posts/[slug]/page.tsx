import Wrapper from "@/components/shared/Wrapper";
import Post from "../Post";
import { fetchCommentsFromDb } from "@/lib/fetchComments";
import CommentSection from "../CommentSection";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
import { getSinglePost } from "@/lib/getSinglePost";
import CategoriesSection from "@/components/sections/categoriesSection/CategoriesSection";
import { IResponsePost } from "@/types/types";

const PostPage = async ({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> => {
  const { slug } = params;
  const post = await getSinglePost(slug);

  const posts = await fetchPostsFromDb();

  return (
    <Wrapper>
      <div className="py-16">
        <Post post={post} />
        <CategoriesSection />
        <CommentSection
          post={post}
          posts={posts.data
            .sort(
              (a: IResponsePost, b: IResponsePost) =>
                Number(b.id) - Number(a.id)
            )
            .slice(0, 4)}
        />
      </div>
    </Wrapper>
  );
};

export default PostPage;
