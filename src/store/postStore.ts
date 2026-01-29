import { create } from "zustand";
import type { Post } from "@/types/post";
import * as postService from "@/services/posts.service";

interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;

  getPosts: () => Promise<void>;
  getPostById: (id: string) => Promise<void>;
  addPost: (post: Omit<Post, "id">) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,

  getPosts: async () => {
    try {
      set({ loading: true, error: null });
      const posts = await postService.fetchPosts();
      set({ posts });
    } catch {
      set({ error: "Failed to fetch posts" });
    } finally {
      set({ loading: false });
    }
  },

  getPostById: async (id) => {
    try {
      set({ loading: true, error: null });
      const post = await postService.fetchPostById(id);
      set({ selectedPost: post });
    } catch {
      set({ error: "Failed to fetch post" });
    } finally {
      set({ loading: false });
    }
  },

  addPost: async (post) => {
    try {
      set({ loading: true, error: null });
      const newPost = await postService.createPost(post);
      set((state) => ({
        posts: [newPost, ...state.posts],
      }));
    } catch {
      set({ error: "Failed to create post" });
    } finally {
      set({ loading: false });
    }
  },
}));
