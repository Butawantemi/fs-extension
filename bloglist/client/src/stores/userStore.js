import { create } from "zustand";
import userService from "../services/user";

export const useUser = create((set) => ({
  user: null,
  users: [],
  setUser: (loginUser) => {
    set(() => ({ user: loginUser }));
  },
  setUsers: async () => {
    const allUsers = await userService.getAllUsers();
    set(() => ({ users: allUsers }));
  },
}));
