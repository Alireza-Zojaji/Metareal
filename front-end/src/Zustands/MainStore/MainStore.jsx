import { create } from "zustand";

export const useMainStore = create((set) => ({
  username: null,
  setUsername: (val) => set((state) => ({ username: val })),
}));
