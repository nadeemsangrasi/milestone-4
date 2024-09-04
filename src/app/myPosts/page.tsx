import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import MyPostCard from "./MyPostCard";

const MyPosts = () => {
  return (
    <Wrapper>
      <div className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center  my-16">
          Explore your posts
        </h1>
        <div className="flex justify-between items-center gap-4 flex-wrap my-16">
          <MyPostCard />
          <MyPostCard />
          <MyPostCard />
        </div>
      </div>
    </Wrapper>
  );
};

export default MyPosts;
