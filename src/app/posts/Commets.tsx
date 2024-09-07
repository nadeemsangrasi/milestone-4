"use client";
import { Button } from "@/components/ui/button";
import { CustomSession } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CommentCard from "./[slug]/CommentCard";
import Categories from "@/components/sections/categoriesSection/Categories";

const Commets = () => {
  const { data, status } = useSession();
  const [comment, setComment] = useState("");
  const session = data as CustomSession;
  return (
    <>
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
      ) : status === "loading" ? (
        <Loader2
          size={32}
          strokeWidth={3}
          absoluteStrokeWidth
          className="mx-4 my-4"
        />
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
    </>
  );
};

export default Commets;
