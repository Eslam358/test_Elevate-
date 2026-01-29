import api from "./axios";
import type  { Post } from "@/types/post";

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>("/posts");
  console.log(data)
  return data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
};

export const createPost = async (post: Omit<Post, "id">) => {
  const { data } = await api.post("/posts", post);
  console.log("---------",data)
  return data;
};

