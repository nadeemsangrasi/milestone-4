import Wrapper from "@/components/shared/Wrapper";
import Categories from "./Categories";
const CategoriesSection = () => {
  return (
    <Wrapper>
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold text-center lg:text-left">
          Popular Categories
        </h1>
        <div className="mt-6 grid grid-cols-2  sm:grid-cols-3 md:grid-cols-6 gap-4">
          <Categories />
        </div>
      </div>
    </Wrapper>
  );
};

export default CategoriesSection;
