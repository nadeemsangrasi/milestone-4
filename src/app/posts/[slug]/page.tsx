import Wrapper from "@/components/shared/Wrapper";
import Post from "../Post";
import Comments from "@/app/posts/Commets";
import axios, { AxiosError } from "axios";
import CommentCard from "./CommentCard";
import Categories from "@/components/sections/categoriesSection/Categories";
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

  return (
    <Wrapper>
      <div className="py-16">
        <Post post={post} />
        <div>
          <Comments post={post} />
          <div className="md:flex justify-between">
            <div className="md:w-3/4">
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <div className="md:w-1/3">
              <h1 className="text-2xl font-medium">Explore more</h1>
              <div className="mt-6 grid  md:grid-cols-1 gap-4">
                <Categories />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostPage;
