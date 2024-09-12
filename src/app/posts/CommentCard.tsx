import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Edit3, Trash } from "lucide-react";
import { ICommentCard, IResponseComment } from "@/types/types";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
const CommentCard = ({
  comment,
  user,
  setContent,
  updatedComments,
  setUpdatedComments,
  content,
  setIsEdditing,
  isEditing,
}: ICommentCard): JSX.Element => {
  const { toast } = useToast();
  const handleEditComment = async () => {
    setIsEdditing(!isEditing);
    setContent({ ...content, content: comment.content, id: comment.id });
    setUpdatedComments(
      updatedComments.filter((myComment: any) => myComment.id !== comment.id)
    );
  };

  const handleDeleteComment = async () => {
    try {
      const res: any = await axios.delete(
        `/api/blog/comment?userId=${user?.id}&commentId=${comment.id}`
      );
      if (!res.data.success) {
        toast({
          title: "Faild to delete comment",
          description: res.data.message,
          variant: "destructive",
        });
      }

      toast({
        title: "comment deleted",
        description: res.data.message,
      });
      setUpdatedComments(
        updatedComments.filter((myComment: any) => myComment.id !== comment.id)
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Faild to delete comment", axiosError);
      toast({
        title: "Faild to delete comment",
        description: axiosError.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mb-4 p-3  rounded-lg text-white">
      <div className="flex items-center gap-2">
        <Image
          src={comment?.imageUrl}
          alt="image"
          className="w-[40px] h-[40px] rounded-full"
          height={1000}
          width={1000}
        />
        <div>
          <p className="font-semibold text-black dark:text-white">
            {comment.userId === user?.id ? "you" : comment.username}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400  ]">
            {dayjs(comment.createdAt).format("DD/MM/YYY")}
          </p>
          <span className="text-black dark:text-white">
            {comment.isEdited && "edited"}
          </span>
        </div>
      </div>
      <p className="mt-1 text-[15px] leading-1 text-black dark:text-white">
        {comment.content}
      </p>
      {comment.userId === user?.id && (
        <div className="flex gap-2 mt-2">
          <Edit3
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="cursor-pointer text-black dark:text-white"
            onClick={handleEditComment}
          />
          <Trash
            size={20}
            strokeWidth={2}
            absoluteStrokeWidth
            className="cursor-pointer text-black dark:text-white"
            onClick={handleDeleteComment}
          />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
