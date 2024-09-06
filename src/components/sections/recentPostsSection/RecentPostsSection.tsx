import Wrapper from "@/components/shared/Wrapper";
import RecentPostCard from "./RecentPostCard";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";
import { fetchPostsFromDb } from "@/lib/fetchPosts";

const RecentPostsSection = () => {
  const [posts, setPosts] = useState<any>([]);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data, status } = useSession();
  const session = data as CustomSession;

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchPosts = async () => {
      const res = await fetchPostsFromDb();

      if (!res.success) {
        setError(res.message);
        toast({
          title: "Error fetching posts",
          description: res.message,
          variant: "destructive",
        });
      }
      const posts = res.data?.slice(0, 4) ?? [];
      setPosts(posts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <Wrapper>
      <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left mb-6">
        Recent Post
      </h1>
      <div className="space-y-8">
        {posts.length === 0 ? (
          <h1 className="mx-2 text-xl font-semibold">No posts found</h1>
        ) : (
          posts.map((post) => <RecentPostCard key={post.id} post={post} />)
        )}
        <RecentPostCard />
        <RecentPostCard />
      </div>
    </Wrapper>
  );
};

export default RecentPostsSection;
