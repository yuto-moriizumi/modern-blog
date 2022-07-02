export type Article = {
  id: number;
  title?: string;
  content?: string;
  author?: User;
};

export type User = {
  id: number;
  name?: string;
};
