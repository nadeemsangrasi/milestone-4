import { Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface CustomSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface CustomToken extends JWT {
  id?: string;
}

export interface IUploadPost {
  title: string;
  imageUrl: string;
  category: string;
}
export interface IResponsePost {
  id: string;
  title: string;
  username: string;
  content: string;
  imageUrl: string;
  userImageUrl: string;
  categorySlug: string;
  userId: string;
  slug: string;
  createdAt: string;
  isEdited: boolean;
}

export interface IResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ICategories {
  id: string;
  slug: string;
  name: string;
  color?: string;
}

export interface IResponseComment {
  id: string;
  content: string;
  postId: string;
  username: string;
  imageUrl: string;
  userId: string;
  isEdited: boolean;
  createdAt: string;
}

export interface IComment {
  postId: string;
  userId: string;
  content: string;
  username: string;
  imageUrl: string;
}

export interface IPostContext {
  isLoading: boolean;
  posts: IResponsePost[];
  categories: ICategories[];
  isLoadingCategories: boolean;
  getSingleCategory: (id: string) => ICategories | undefined;
  isEditingPost: boolean;
  setIsEditingPost: Dispatch<SetStateAction<boolean>>;
  setPosts: Dispatch<SetStateAction<IResponsePost[]>>;
  editPost: (post: IResponsePost) => void;
  deletePost: (post: IResponsePost) => void;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}
export interface ICommentCard {
  comment: IResponseComment;
  user: IUser;
  updatedComments: IResponseComment[];
  setUpdatedComments: Dispatch<SetStateAction<IResponseComment[]>>;
  setContent: Dispatch<SetStateAction<{ id: string; content: string }>>;
  content: { id: string; content: string };
  isEditing: boolean;
  setIsEdditing: Dispatch<SetStateAction<boolean>>;
}
