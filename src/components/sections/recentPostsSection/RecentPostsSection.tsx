import Wrapper from "@/components/shared/Wrapper";
import RecentPostCard from "./RecentPostCard";

const RecentPostsSection = () => {
  return (
    <Wrapper>
      <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left mb-6">
        Recent Post
      </h1>
      <div className="space-y-8">
        <RecentPostCard />
        <RecentPostCard />
        <RecentPostCard />
      </div>
    </Wrapper>
  );
};

export default RecentPostsSection;
