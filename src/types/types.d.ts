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
