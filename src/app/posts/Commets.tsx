"use client";
import { Button } from "@/components/ui/button";
import { CustomSession, IResponsePost } from "@/types/types";
import { Link, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState, FormEventHandler } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";

const Commets = ({ post }: { post: IResponsePost }) => {
  const { data, status } = useSession();
  const session = data as CustomSession;
  const [comment, setComment] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { toast } = useToast();
  const handleSubmitComment = async (e: any) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const res: any = await axios.post("/api/blog/comment", {
        content: comment,
        imageUrl: session.user.image,
        postId: post.id,
        userId: session.user.id,
        username: session.user.name,
      });
      if (!res.success) {
        toast({
          title: "Faild to comment",
          description: res.message,
          variant: "destructive",
        });
      }

      toast({
        title: "comment sanded",
        description: res.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Faild to comment", axiosError);
      toast({
        title: "Faild to comment",
        description: axiosError.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  };
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
        <form onSubmit={handleSubmitComment}>
          <div className="flex gap-2 w-full md:w-1/2 items-center my-2">
            <input
              type="text"
              placeholder="Write a comment..."
              id="comment"
              className="py-3 px-2 rounded-lg text-black  w-full bg-gray-300 placeholder:text-black"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              className=" text-xl  font-bold"
              type="submit"
              disabled={isSubmiting || comment === ""}
            >
              {isSubmiting ? "sending..." : "sand"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Commets;
