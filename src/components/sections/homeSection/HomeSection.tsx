import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import homeImg1 from "@/assets/images/home-1.jpg";
import homeImg2 from "@/assets/images/home-2.jpg";
import homeImg3 from "@/assets/images/home-3.jpg";
import homeImg4 from "@/assets/images/home-4.jpg";
import React from "react";

const HomeSection = () => {
  return (
    <Wrapper>
      <div className="w-full mt-16">
        <div className="grid grid-cols-3 gap-4 ">
          <Image
            src={homeImg1}
            alt="Exploring New Horizons"
            className="rounded-lg"
          />
          <Image
            src={homeImg2}
            alt="Culinary Delights"
            className="rounded-lg"
          />
          <Image src={homeImg3} alt="Tech Insights" className="rounded-lg" />
        </div>
        <div className="mt-5 lg:flex  justify-between">
          <div className="lg:w-[56%] my-6 space-y-4 ">
            <h1 className="text-4xl md:text-[2.9rem] font-bold dark:text-white text-black">
              Welcome to Nadeem blogs
            </h1>
            <h2 className="text-xl md:text-3xl font-semibold dark:text-gray-300 mt-2 text-gray-800">
              Discover Stories, Ideas, and Insights
            </h2>
            <p className="dark:text-gray-400 mt-4 text-gray-800 md:text-xl font-medium">
              Dive into a world of knowledge and inspiration as we explore a
              variety of topics ranging from technology and fashion to food and
              travel. Join our community and stay updated with the latest trends
              and insights.
            </p>
          </div>
          <div className="lg:w-[42%]">
            <Image src={homeImg4} alt="home image 3" className="rounded-lg" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeSection;
