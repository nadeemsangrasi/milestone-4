"use client";
import Wrapper from "@/components/shared/Wrapper";

import Image from "next/image";
import { useState } from "react";
import img from "@/assets/images/home-3.jpg";
import CommentCard from "./CommentCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/types";

const PostPage = ({ params }: { params: { slug: string } }) => {
  const { data, status } = useSession();
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
            <h1 className="text-3xl sm:text-5xl font-bold mt-8 text-emerald-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h1>
            <h1 className="text-2xl inline-block">2023-5-6</h1>
            <span>coding</span>
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
            <div>
              <form></form>
            </div>
          )}
          <div>
            <div className="w-1/2">
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </div>
            <div>
              <h1>Explore more</h1>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostPage;
