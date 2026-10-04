import { create } from "zustand";
//import blogsServices from "../services/blogs";

export const useNotification = create((set) => ({
  notificationMessage: null,
  notificationType: "success",
  setNotificationMessage: (message) => {
    set(() => ({ notificationMessage: message }));
  },
  setNotificationType: (type) => {
    set(() => ({ notificationType: type }));
  },
}));
