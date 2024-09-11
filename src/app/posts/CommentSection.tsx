"use client";
import { Button } from "@/components/ui/button";
import {
  CustomSession,
  IResponseComment,
  IResponsePost,
  IUser,
} from "@/types/types";
import { Link, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState, FormEventHandler, use, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import CommentCard from "./CommentCard";
import ExploreMoreCard from "./ExploreMoreCard";

const CommentSection = ({
  post,
  comments,
  posts,
}: {
  post: IResponsePost;
  comments: IResponseComment[];
  posts: IResponsePost[];
}): JSX.Element => {
  const { data, status } = useSession();
  const session = data as CustomSession;
  const [comment, setComment] = useState({
    id: "",
    content: "",
  });
  const [updatedComments, setUpdatedComments] = useState<IResponseComment[]>(
    []
  );
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const { toast } = useToast();
  const handleSubmitComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const res: any = await axios.post("/api/blog/comment", {
        content: comment.content,
        imageUrl: session.user.image,
        postId: post.id,
        userId: session.user.id,
        username: session.user.name,
      });

      if (!res.data.success) {
        toast({
          title: "Failed to comment",
          description: res.data.message,
          variant: "destructive",
        });
        return;
      }

      setUpdatedComments([res.data.data, ...updatedComments]);

      toast({
        title: "Comment sent",
        description: res.data.message,
      });
      setComment({ id: "", content: "" });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to comment", axiosError);
      toast({
        title: "Failed to comment",
        description: axiosError.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    setUpdatedComments(comments);
  }, [comments]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdatedComments(
        updatedComments.filter((myComment: any) => myComment.id !== comment.id)
      );
      const res = await axios.patch("/api/blog/comment", {
        userId: session.user.id,
        commentId: comment.id,
        content: comment.content,
      });
      if (!res.data.success) {
        toast({
          title: "Failed to edit comment",
          description: res.data.message,
          variant: "destructive",
        });
      } else {
        setUpdatedComments([res.data.data, ...updatedComments]);
        toast({
          title: "Comment edited",
          description: res.data.message,
        });
        setIsEditingComment(!isEditingComment);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Failed to edit comment", axiosError);
      toast({
        title: "Failed to edit comment",
        description: axiosError.message,
        variant: "destructive",
      });
    }
  };
  return (
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
      ) : status === "loading" ? (
        <Loader2
          size={32}
          strokeWidth={3}
          absoluteStrokeWidth
          className="mx-4 my-4"
        />
      ) : (
        <form onSubmit={isEditingComment ? handleEdit : handleSubmitComment}>
          <div className="flex gap-2 w-full lg:w-1/2 items-center my-2">
            <input
              type="text"
              placeholder="Write a comment..."
              id="comment"
              className="py-3 px-2 rounded-lg text-black  w-full bg-gray-300 placeholder:text-black"
              value={comment.content}
              onChange={(event) =>
                setComment({ ...comment, content: event.target.value })
              }
            />
            <Button
              className=" text-xl  font-bold"
              type="submit"
              disabled={isSubmiting || comment.content === ""}
            >
              {isSubmiting ? "sending..." : "sand"}
            </Button>
          </div>
        </form>
      )}
      <div className="lg:flex justify-between">
        <div className="lg:w-3/4">
          {status !== "loading" &&
            updatedComments?.map((comments: IResponseComment) => (
              <CommentCard
                key={comments?.id}
                comment={comments}
                user={session?.user as IUser}
                setContent={setComment}
                content={comment}
                updatedComments={updatedComments}
                setUpdatedComments={setUpdatedComments}
                setIsEdditing={setIsEditingComment}
                isEditing={isEditingComment}
              />
            ))}
        </div>
        <div className="lg:w-1/3">
          <h1 className="text-3xl font-medium text-center lg:text-left">
            Explore more
          </h1>
          <div className="grid  md:grid-cols-1 gap-4">
            {status !== "loading" &&
              posts.map((post) => (
                <ExploreMoreCard
                  key={post.id}
                  post={post}
                  user={session?.user}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
