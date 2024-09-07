import Wrapper from "@/components/shared/Wrapper";
import MyPostCard from "./MyPostCard";
import { fetchPostsFromDb } from "@/lib/fetchPosts";
import { IResponsePost } from "@/types/types";

const MyPosts = async () => {
  const posts = await fetchPostsFromDb();
  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Explore your posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          {posts.data.map((post: IResponsePost) => (
            <MyPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default MyPosts;
