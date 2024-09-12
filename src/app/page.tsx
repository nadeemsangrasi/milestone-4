import CategoriesSection from "@/components/sections/categoriesSection/CategoriesSection";
import HomeSection from "@/components/sections/homeSection/HomeSection";
import RecentPostsSection from "@/components/sections/recentPostsSection/RecentPostsSection";
import Wrapper from "@/components/shared/Wrapper";
export default function Home(): JSX.Element {
  return (
    <div>
      <HomeSection />
      <Wrapper>
        <CategoriesSection />
      </Wrapper>
      <RecentPostsSection />
    </div>
  );
}
