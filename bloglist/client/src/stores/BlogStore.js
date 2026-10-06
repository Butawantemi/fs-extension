import { create } from "zustand";
import blogsService from "../services/blogs";

export const useBlogs = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => {
    set(() => ({ blogs: blogs }));
  },
  setBlogComment: async (blogId, comment) => {
    const updatedBlog = await blogsService.addComment(blogId, { comment });

    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === blogId ? updatedBlog : blog,
      ),
    }));
  },
}));
