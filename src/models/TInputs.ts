import { Post } from "./Posts";

export type InputsProps = {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  post: Post;
};
