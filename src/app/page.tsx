import CategoriesSection from "@/components/sections/categoriesSection/CategoriesSection";
import HomeSection from "@/components/sections/homeSection/HomeSection";
import RecentPostsSection from "@/components/sections/recentPostsSection/RecentPostsSection";
export default function Home(): JSX.Element {
  return (
    <div>
      <HomeSection />
      <CategoriesSection />
      <RecentPostsSection />
    </div>
  );
}
