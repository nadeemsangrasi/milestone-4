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

export interface IPost {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  category: string;
}
