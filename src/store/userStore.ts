import { create } from "zustand";
import type { Author} from "@/types/post";
import * as usersService from "@/services/author.service";

interface UserState {
 
  users: Author[];
  selectedUser: Author | null;
  loading: boolean;
  error: string | null;  
  getUsers: () => Promise<void>;
  getUsersById: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  getUsers: async () => {
    try {
      set({ loading: true, error: null });
      const users = await usersService.fetchUsers();
      set({ users });
    } catch {
      set({ error: "Failed to fetch users" });
    } finally {
      set({ loading: false });
    }
  },
  getUsersById: async (id) => {
    try {
      set({ loading: true, error: null });
      const user = await usersService.fetchUsersId(id);
      set({ selectedUser:user });
    } catch {
      set({ error: "Failed to fetch user" });
    } finally {
      set({ loading: false });
    }
  },
  
}));
