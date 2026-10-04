import { create } from "zustand";

export const useBlogs = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => {
    set(() => ({ blogs: blogs }));
  },
}));
