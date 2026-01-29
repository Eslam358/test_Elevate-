import api from "./axios";
import type  { Author } from "@/types/post";

export const fetchUsers = async (): Promise<Author[]> => {
  const { data } = await api.get<Author[]>("/users");
  console.log(data)
  return data;
};

export const fetchUsersId = async (id: number): Promise<Author> => {
  const { data } = await api.get<Author>(`/users/${id}`);
  return data;
};



