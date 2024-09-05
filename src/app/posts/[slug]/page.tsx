"use client";
import Wrapper from "@/components/shared/Wrapper";

import Image from "next/image";
import { useState } from "react";
import img from "@/assets/images/home-3.jpg";
import CommentCard from "./CommentCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";
import { Button } from "@/components/ui/button";
import { categories } from "@/components/sections/categoriesSection/CategoriesSection";

const PostPage = ({ params }: { params: { slug: string } }) => {
  const { data, status } = useSession();
  const [comment, setComment] = useState("");
  const session = data as CustomSession;
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <div className="py-16">
        <div className="my-8 mx-auto">
          <div>
            <Image src={img} alt="image" className="rounded-lg w-full" />
          </div>
          <div className="mt-4 space-y-4">
            <h1 className="ext-3xl sm:text-5xl font-bold text-center lg:text-left my-2 mt-12">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h1>
            <h1 className="text-2xl inline-block px-2">2023-5-6</h1>
            <span className="text-sunset-orange font-medium text-xl">
              coding
            </span>
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              sunt suscipit rerum animi alias omnis earum? Sequi voluptate sit
              natus rerum, alias in, maxime illo ipsam dolore dolor quibusdam
              doloremque? Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Esse inventore velit natus nulla unde at provident, nostrum
              repellat voluptatibus reprehenderit perferendis perspiciatis!
              Accusantium veritatis a magni asperiores fugiat facilis numquam?
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center lg:text-left my-2 mt-12">
            Comments
          </h1>
          {status === "unauthenticated" ? (
            <Link
              href={"/login"}
              className="sm:text-xl text-2xl font-medium border-b-2 border-white inline-block my-2"
            >
              log in to write comment
            </Link>
          ) : (
            <form>
              <div className="flex gap-2 w-full md:w-1/2 items-center my-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  id="comment"
                  className="py-3 px-2 rounded-lg text-black  w-full bg-gray-300 placeholder:text-black"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <Button className=" text-xl  font-bold">Sand</Button>
              </div>
            </form>
          )}
          <div className="md:flex justify-between">
            <div className="md:w-3/4">
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <div className="md:w-1/3">
              <h1 className="text-2xl font-medium">Explore more</h1>
              <div className="mt-6 grid  md:grid-cols-1 gap-4">
                {categories.map(({ title, color }) => (
                  <Button
                    key={title}
                    className={`font-bold text-xl sm:text-2xl ${color}`}
                  >
                    {title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostPage;
