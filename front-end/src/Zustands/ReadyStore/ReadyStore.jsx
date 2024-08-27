import { create } from "zustand";
export const useReadyStore = create((set) => ({
  readyAvatar: null,
  setReadyAvatar: (avatar) => set({ readyAvatar: avatar }),
}));
